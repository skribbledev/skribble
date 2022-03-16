---
title: Skribble Css Config
description: Configuration options for `skribble-css`
layout: ../../../layouts/main-layout.astro
---

## `output`

```ts
type Output = {
  client: string;
  css: string;
  meta: string;
  augmentPackageJson: boolean;
};
```

Configure the output files and directories.

This configuration object is required.

### `client`

```ts
type Client = string;
```

Specify the location of the client output file.

This can be specified with a `.(m)js` file extension or a `.ts` file extension. If a `.js` file extension is specified then both the `<path>.js` and a `<path>.d.ts` file are created to enable better autocomplete. The file created re-exports the `skribble-css/client` with a global type augmentation.

It also generates the overrides for the `cx` function when creating apps.

Libraries don't apply the override.

For apps the generated file will look something like the following.

### `css`

```ts
type Css = string;
```

Generate the css file which can be imported directly depending on the type of build. This will create the `skribble.css` file for you. For libraries this is automatically added to the `package.json` file under the `skribble-css` folder.

### `meta`

```ts
type Meta = string;
```

The metadata file which is used for libraries to identify all the classes which are used. This allows for apps to consume libraries without having to rescan the source files. Also libraries which depend on libraries that use skribble-css will add a section outlining their meta dependencies.

### `augmentPackageJson`

```ts
type AugmentPackageJson = boolean;
const defaultValue: AugmentPackageJson = true;
```

By default for libraries the `package.json` file will be augmented with a `skribbleCss` section based which provides the path to the meta file. Consumers of the library will read the package.json for the property and use it to add required classNames to the final css bundle.
