// @ts-check
const { themes: prismThemes } = require("prism-react-renderer");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "ServiceNow SDK",
  tagline: "Fluent API Reference Documentation",
  favicon: "img/favicon.ico",

  url: "https://servicenow.github.io",
  baseUrl: "/sdk/",

  organizationName: "ServiceNow",
  projectName: "sdk",
  trailingSlash: false,

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Parse .md files as CommonMark (not MDX) so TypeScript generics like <T>
  // in headings don't cause JSX parse errors.
  markdown: {
    format: "detect",
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: "current_docs",
          sidebarPath: "./sidebars.js",
          routeBasePath: "/",
          lastVersion: "4.3.0",
          versions: {
            current: {
              label: "Latest (4.3.0)",
              path: "latest",
              banner: "none",
            },
          },
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: "dark",
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: "ServiceNow SDK",
        logo: {
          alt: "ServiceNow SDK Logo",
          src: "img/logo.png",
        },
        items: [
          {
            type: "docsVersionDropdown",
            position: "right",
          },
          {
            href: "https://github.com/ServiceNow/sdk",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Resources",
            items: [
              {
                label: "NPM Package",
                href: "https://www.npmjs.com/package/@servicenow/sdk",
              },
              {
                label: "SDK Examples",
                href: "https://github.com/servicenow/sdk-examples",
              },
              {
                label: "Release Notes",
                href: "https://github.com/servicenow/sdk/releases",
              },
            ],
          },
          {
            title: "Help & Community",
            items: [
              {
                label: "Discussions",
                href: "https://github.com/ServiceNow/sdk/discussions",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} ServiceNow.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ["typescript"],
      },

      metadata: [
        {
          name: "keywords",
          content: "fluent, servicenow, sdk, api, reference, documentation",
        },
      ],
    }),
};

module.exports = config;
