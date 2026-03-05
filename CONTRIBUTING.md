# Contributing to ServiceNow SDK Docs

This repository hosts the API reference documentation site for the ServiceNow SDK, built with [Docusaurus](https://docusaurus.io) and deployed to GitHub Pages at `https://servicenow.github.io/sdk`.

## Prerequisites

- **Node.js** 18 or later
- **npm** 9 or later
- The **fluent monorepo** checked out at `../../fluent` relative to this repo (i.e., `../fluent` as a sibling directory). This is the source of truth for API documentation.

## Setup

```bash
git clone https://github.com/ServiceNow/sdk.git
cd sdk
npm install
```

## Local Development

Start the dev server with live reload:

```bash
npm start
```

The site is served at `http://localhost:3000/sdk/`. Changes to files in `current_docs/`, `src/`, or `docusaurus.config.js` are reflected immediately without a full rebuild.

## Project Structure

```
sdk/
├── current_docs/          # Active (unreleased) docs — edited directly
│   ├── intro.md           # Landing page
│   └── api/               # One .md file per SDK API function
├── versioned_docs/        # Snapshots created by `npm run version`
├── versioned_sidebars/    # Auto-generated alongside versioned_docs
├── versions.json          # List of released version numbers
├── src/
│   ├── css/custom.css     # Theme overrides and embed mode styles
│   └── theme/Root.js      # Handles ?embed=true URL parameter
├── static/
│   ├── llms.txt           # LLM-friendly index of all API pages
│   └── llms-full.txt      # Full API content in a single file
├── scripts/
│   └── sync-docs.sh       # Syncs docs from the fluent repo
├── docusaurus.config.js
├── sidebars.js
└── package.json
```

## Syncing API Docs

API documentation is generated from the fluent monorepo at `../../fluent/packages/sdk/docs`. To pull the latest docs:

```bash
npm run sync
```

This script:

1. Reads the SDK version from `../../fluent/packages/sdk/package.json`
2. Copies all `.md` files into `current_docs/api/`, converting filenames to kebab-case and injecting `sidebar_label` front matter
3. Syncs the same files into any existing versioned snapshot under `versioned_docs/`
4. Regenerates `static/llms.txt` and `static/llms-full.txt`
5. Creates a new Docusaurus version snapshot if the version number is new

You can also pass a version explicitly:

```bash
npm run sync 4.6.0
```

## Releasing a New Version

When a new SDK version is published:

1. Run `npm run sync` — it will detect the new version, copy docs, and snapshot automatically
2. The script updates `docusaurus.config.js` with the new `lastVersion` and version label
3. Run build `npm run build`
4. Commit everything:
   ```bash
   git add current_docs/ versioned_docs/ versioned_sidebars/ versions.json static/llms*.txt docusaurus.config.js
   git commit -m "docs: add version X.Y.Z"
   ```
5. Push to `docs-gh-pages` with build output, should be updated automatically

## Building

To produce a production build locally:

```bash
npm run build
```

Output goes to the `docs/` folder. Preview it with:

```bash
npx docusaurus serve --dir docs
```

## Embed Mode

Any API page can be linked to without navigation chrome by appending `?embed=true`:

```
https://servicenow.github.io/sdk/api/acl?embed=true
```

This hides the navbar, sidebar, and footer — useful for embedding in external tools or sharing focused links.

## LLM Files

`static/llms.txt` and `static/llms-full.txt` are regenerated automatically by `npm run sync`. If you add or rename docs manually, regenerate them by running `npm run sync` or editing the files directly.

- `llms.txt` — index with embed links and one-line descriptions
- `llms-full.txt` — full markdown content of all API docs concatenated
