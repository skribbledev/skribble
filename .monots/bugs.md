# Bugs

I tend to forget the bugs that I stumble across while writing code. Sometimes I'll fix a bug and a few minutes later come across a similar issue and not remember how I fixed the previous one.

I'll try documenting the bugs as I find them and hopefully fix them also.

### Adding rust to the skribble monorepo

> 11th November 2021

I'm embarking on building my first rust project ever.

It will be a tailwind-esque styling solution which uses typescript to ensure that only classes that are defined can be used.

Rather than typing things out as string, you will import and object and type like the following:

```ts
import { c, cx } from 'skribble/css';
import { useSomeState } from 'use-some-state';

const App = () => {
  const { isAwesome } = useSomeState();
  return (
    <div
      className={cx([
        c.block,
        c.sm.table,
        c.md.inlineBlock,
        c.textBlack,
        c.lg.textRed,
        isAwesome && c.fontBold,
      ])}
    >
      Hello!
    </div>
  );
};
```

### Padding change not causing a rerender

> 8th November 2021

When I update the padding during of the button component, there is a hot reload, but the annotation isn't updated to the new size of the component. Up until now, I've been refreshing when this happens.

It's likely that the resize observer only captures events that trigger an update externally, and internal events like padding changes are not captured.

- Possible fix is to use a [mutation observer](https://www.npmjs.com/package/@rooks/use-mutation-observer), but this might be overkill.

### RoundedBoxAnnotation

> 7th November 2021

The box was rendering in the wrong position when the position of the `target` was not set to `relative`. This should not be the case since the position of the paths is generated from a `rect` which is relative the bounding box of the `target`.

- First checked that the rect being calculated was correct. I had to [turn on rulers](https://stackoverflow.com/a/48491395/2172153) to ensure that the `x` and `y` offset values were correct.
- Then I tried using the `BoxAnnotation`. This positioned the svg paths correctly relative to the target element.
- I've narrowed the bug down to the `createRoundedPath` function.
- While making this fix I managed to reduce the number of unnecessary renders by the roughjs library which caused the borders to be updated whenever the button was hovered on. This was done by memoizing the return from `useAnnotatedProps`. Controversially, Object.values(props) was used to spread the values to the array passed to `useMemo`.
- I've taken a slight diversion. I need to fix the rounded padding so I want to improve the following aspects of the annotations.
  - [ ] Allow units other than pixels. This [library](https://github.com/alexdunphy/units/blob/master/lib/conversions/length.js) has been useful.
    - [x] Create dom-utils for this
    - [ ] Apply to padding
    - [ ] Apply to radius
  - [ ] Allow [borderRadius](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius) to be a string and apply it to both the target and the annotation.
  - [x] Simplify the rounded rough annotation calculation
    - This has been done by adding the `x` and `y` offsets to the path calculation. This was all that was missing.
