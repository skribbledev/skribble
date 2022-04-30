export const SITE = {
  title: 'Skribble Docs',
  description: 'The documentation website for skribble-css.',
  defaultLanguage: 'en_GB',
};

export const OPEN_GRAPH = {
  image: {
    src: 'https://github.com/skribbledev/skribble/blob/main/.monots/assets/social-banner.jpg?raw=true',
    alt:
      'astro logo on a starry expanse of space,' +
      ' with a purple saturn-like planet floating in the right foreground',
  },
  twitter: 'skribbledev',
};

export const KNOWN_LANGUAGES = {
  English: 'en',
};

// Uncomment this to add an "Edit this page" button to every page of documentation.
export const GITHUB_EDIT_URL = `https://github.com/skribbledev/skribble/blob/main/docs/`;

// Uncomment this to add an "Join our Community" button to every page of documentation.
export const COMMUNITY_INVITE_URL = `https://skribble.dev/chat`;

// Uncomment this to enable site search.
// See "Algolia" section of the README for more information.
// export const ALGOLIA = {
//   indexName: 'XXXXXXXXXX',
//   apiKey: 'XXXXXXXXXX',
// };

export const SIDEBAR = {
  en: [
    { text: 'Introduction', link: 'en/introduction' },

    { text: 'Skribble Css', header: true },
    { text: 'Getting Started', link: 'en/css/main' },
    { text: 'Configuration', link: 'en/css/config' },
    { text: 'Overrides', link: 'en/css/overrides' },
  ],
};
