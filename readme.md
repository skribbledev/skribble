<p align="center">
  <a href="#">
    <img width="300" height="300" src="./.monots/assets/logo.svg" alt="Hand-drawn smiling face" title="Skribble Logo" />
  </a>
</p>

<p align="center">
  A hand-drawn design system with custom icons and <em>a beautiful<em> monospace font.
</p>

<br />

<p align="center">
  <a href="#getting-started"><strong>Getting Started</strong></a> ·
  <a href="#why"><strong>Why?</strong></a> ·
  <a href="#plans"><strong>Plans</strong></a> ·
  <a href="./docs/docs"><strong>Documentation</strong></a> ·
  <a href="./.github/contributing.md"><strong>Contributing</strong></a>
</p>

<br />

<p align="center">
  <a href="https://github.com/skribbledev/monorepo/actions?query=workflow:ci">
    <img src="https://github.com/skribbledev/monorepo/workflows/ci/badge.svg?branch=main" alt="Continuous integration badge for github actions" title="CI Badge" />
  </a>
</p>

<br />

## Usage

### Installation

To get started you will need to install the `skribble` package.

```bash
# With yarn
yarn add skribble

# With npm
npm install skribble

# With pnpm
pnpm add skribble
```

### Contributing

To contribute to this project you will need to install the following dependencies.

- [node](https://nodejs.org/en/download/) - _version >=16 which also installs corepack which is used extensively in this project_
- [rust](https://www.rust-lang.org/learn/get-started)

Once installed you should be able to run the following command to get running.

```bash
npm run bootstrap
```

This will setup the project and install the dependencies. At this point you will be able to use the prescribed version of `pnpm` as the default package manager thanks to corepack.

## Getting Started

Skribble is a TypeScript first atomic css design system. It build around the ideas proposed by frameworks like [Tailwind CSS](https://tailwindcss.com) and [Windi CSS](https://windicss.org).
