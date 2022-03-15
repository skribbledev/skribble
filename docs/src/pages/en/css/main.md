---
title: Skribble Css
description: Getting started with `skribble-css`
layout: ../../../layouts/main-layout.astro
---

## Installation

To install `skribble-css` I recommend using pnpm which is my package manager of choice. However, all these steps can be replicated with `npm` or `yarn`.

```bash
pnpm install skribble-css
```

Create a file called `skribble-css.config.js` in your project / package root. For those who prefer TypeScript a `.ts` also works.

```js
import { defineConfig } from 'skribble-css/config';

export default defineConfig({});
```
