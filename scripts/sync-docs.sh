#!/usr/bin/env bash
# sync-docs.sh — Sync API docs from the fluent SDK package and snapshot a Docusaurus version.
#
# Usage:
#   ./scripts/sync-docs.sh            # auto-detects version from ../../fluent/packages/sdk/package.json
#   ./scripts/sync-docs.sh 4.5.0      # override version explicitly
#
# What it does:
#   1. Reads the SDK version from the fluent monorepo (or uses the override)
#   2. Copies markdown files from ../../fluent/packages/sdk/docs into docs/api/
#   3. Runs `npm run version <sdk-version>` to snapshot a new Docusaurus version
#      (skipped if that version already exists in versions.json)
#
# Expects the fluent repo at ../../fluent relative to this repo root.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SOURCE_ROOT="$REPO_ROOT/../../fluent/packages/sdk"
SOURCE_DOCS="$SOURCE_ROOT/docs"
SOURCE_PKG="$SOURCE_ROOT/package.json"
DEST_DIR="$REPO_ROOT/current_docs/api"
VERSIONS_FILE="$REPO_ROOT/versions.json"

# ── Resolve version ──────────────────────────────────────────────────────────

if [ -n "${1:-}" ]; then
  SDK_VERSION="$1"
  echo "Using provided version: $SDK_VERSION"
else
  if [ ! -f "$SOURCE_PKG" ]; then
    echo "Error: Cannot find $SOURCE_PKG. Pass the version as an argument or check the fluent repo path."
    exit 1
  fi
  SDK_VERSION=$(node -p "require('$SOURCE_PKG').version")
  echo "Detected SDK version: $SDK_VERSION"
fi

# Strip pre-release suffix for the docs version label (e.g. 4.5.0-alpha.0 → 4.5.0)
DOCS_VERSION=$(echo "$SDK_VERSION" | sed 's/-.*//')

# ── Check if this version is already snapshotted ─────────────────────────────

if [ -f "$VERSIONS_FILE" ]; then
  if node -e "const v=require('$VERSIONS_FILE'); process.exit(v.includes('$DOCS_VERSION') ? 0 : 1)"; then
    echo "Version $DOCS_VERSION already exists in versions.json — skipping snapshot."
    SKIP_SNAPSHOT=true
  else
    SKIP_SNAPSHOT=false
  fi
else
  SKIP_SNAPSHOT=false
fi

# ── Copy docs ────────────────────────────────────────────────────────────────

if [ ! -d "$SOURCE_DOCS" ]; then
  echo "Error: Source docs directory not found: $SOURCE_DOCS"
  exit 1
fi

echo "Copying docs from: $SOURCE_DOCS"
echo "              to:  $DEST_DIR"

mkdir -p "$DEST_DIR"

find "$SOURCE_DOCS" -name "*.md" | while read -r src_file; do
  base_name=$(basename "$src_file" .md)
  # Convert CamelCase to kebab-case, treating acronyms as a unit.
  # e.g. SPAngularProvider → sp-angular-provider, BusinessRule → business-rule
  dest_name=$(echo "$base_name" | \
    sed -E 's/([A-Z]+)([A-Z][a-z])/\1-\2/g' | \
    sed -E 's/([a-z0-9])([A-Z])/\1-\2/g' | \
    tr '[:upper:]' '[:lower:]')
  dest_file="$DEST_DIR/${dest_name}.md"
  echo "  $(basename "$src_file") -> $(basename "$dest_file")"
  # Prepend sidebar_label front matter using the base filename (no generics)
  { printf -- '---\nsidebar_label: %s\n---\n\n' "$base_name"; cat "$src_file"; } > "$dest_file"
done

echo "Docs copied."

# ── Also sync into the existing versioned snapshot if one exists ──────────────

VERSIONED_DIR="$REPO_ROOT/versioned_docs/version-$DOCS_VERSION/api"
if [ -d "$VERSIONED_DIR" ]; then
  echo "Syncing into existing versioned snapshot: $VERSIONED_DIR"
  find "$DEST_DIR" -name "*.md" | while read -r doc_file; do
    cp "$doc_file" "$VERSIONED_DIR/$(basename "$doc_file")"
  done
  echo "Versioned snapshot updated."
fi

# ── Regenerate llms.txt / llms-full.txt ──────────────────────────────────────

STATIC_DIR="$REPO_ROOT/static"
LLMS_INDEX="$STATIC_DIR/llms.txt"
LLMS_FULL="$STATIC_DIR/llms-full.txt"

echo "Regenerating llms.txt..."

{
  echo "# ServiceNow SDK"
  echo ""
  echo "> TypeScript SDK for developing ServiceNow applications in source code using ServiceNow Fluent — a domain-specific language for creating application metadata as code. Import functions from \`@servicenow/sdk/core\` to define platform records (ACLs, Business Rules, etc.) that are deployed to ServiceNow instances."
  echo ""
  echo "## API Reference"
  echo ""
  find "$DEST_DIR" -name "*.md" | sort | while read -r doc_file; do
    base_name=$(basename "$doc_file" .md)
    # Derive a one-line description from the second non-empty line after the heading
    description=$(grep -m1 -A2 '^# ' "$doc_file" | tail -1 | sed 's/^[[:space:]]*//')
    echo "- [$base_name](https://servicenow.github.io/sdk/api/$base_name?embed=true): $description"
  done
  echo ""
  echo "## Resources"
  echo ""
  echo "- [Full content](https://servicenow.github.io/sdk/llms-full.txt): Complete API reference in a single file"
  echo "- [NPM Package](https://www.npmjs.com/package/@servicenow/sdk): @servicenow/sdk"
  echo "- [Release Notes](https://github.com/servicenow/sdk/releases)"
  echo "- [SDK Examples](https://github.com/servicenow/sdk-examples)"
} > "$LLMS_INDEX"

echo "Regenerating llms-full.txt..."

{
  echo "# ServiceNow SDK — Full API Reference"
  echo ""
  echo "> TypeScript SDK for developing ServiceNow applications in source code using ServiceNow Fluent. Import functions from \`@servicenow/sdk/core\` to define platform records that are deployed to ServiceNow instances."
  echo ""
  find "$DEST_DIR" -name "*.md" | sort | while read -r doc_file; do
    echo "---"
    echo ""
    # Strip front matter (lines between --- delimiters at top of file)
    awk '/^---$/{found++; if(found==2){skip=0; next} else {skip=1; next}} skip{next} 1' "$doc_file"
    echo ""
  done
} > "$LLMS_FULL"

echo "llms.txt files updated."

# ── Snapshot Docusaurus version ───────────────────────────────────────────────

if [ "$SKIP_SNAPSHOT" = false ]; then
  echo "Creating Docusaurus version snapshot: $DOCS_VERSION"
  cd "$REPO_ROOT"
  npm run version "$DOCS_VERSION"

  # Update docusaurus.config.js: set lastVersion and current version label automatically
  node -e "
    const fs = require('fs');
    const path = '$REPO_ROOT/docusaurus.config.js';
    let content = fs.readFileSync(path, 'utf8');
    // Update lastVersion
    content = content.replace(/lastVersion:\s*['\"][^'\"]+['\"]/, \"lastVersion: '$DOCS_VERSION'\");
    // Update current version label
    content = content.replace(/label:\s*['\"]Latest \([^)]+\)['\"]/, \"label: 'Latest ($DOCS_VERSION)'\");
    fs.writeFileSync(path, content);
    console.log('Updated docusaurus.config.js');
  "

  echo "Snapshot created."
  echo ""
  echo "Next steps:"
  echo "  1. Commit versioned_docs/, versioned_sidebars/, versions.json, docs/api/, docusaurus.config.js, static/llms*.txt"
  echo "  2. Push to master to trigger the GitHub Pages deploy"
else
  echo "Nothing more to do."
fi
