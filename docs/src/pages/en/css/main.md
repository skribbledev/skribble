---
title: Skribble Css
description: Getting started with `skribble-css`
layout: ../../../layouts/main-layout.astro
---

## Installation

To install `skribble-css` I recommend using pnpm which is my package manager of choice. However, all these steps can be replicated with `npm` or `yarn`.

```bash
pnpm add skribble-css
```

Create a file called `skribble-css.config.js` in your project / package root. For those who prefer TypeScript a `.ts` also works.

```js
import { defineConfig } from 'skribble-css/config';

export default defineConfig({
  output: {
    client: '<rootDir>/src/skribble-css.ts',
    css: '<rootDir>/dist/skribble.css',
    meta: '<rootDir>/dist/meta.json',
  },
});
```

## Usage

### Cli

To start the cli run the following command in an new terminal.

```bash
pnpm skribble-css watch
```

This will load the config file and start watching the source files for changes. It should be run in the background.

Unlike other atomic css libraries `skribble-css` is imported into the file and the class names are picked out by the cli.
