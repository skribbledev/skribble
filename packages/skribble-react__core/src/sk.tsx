import { Slot } from '@radix-ui/react-slot';
import { cx } from '@skribble-css/client';
import type { ElementType } from 'react';
import { createElement, forwardRef } from 'react';

import type {
  PrimitiveForwardRefComponent,
  PrimitivePropsWithRef,
  SkribblePrimitives,
} from './primitives';
import { primitives } from './primitives';

const _sk: any = (tag: ElementType) => {
  const Component = forwardRef((props: PrimitivePropsWithRef<any>, ref: any) => {
    const { className, asChild, ...primitiveProps } = props;
    const InnerComponent = asChild ? Slot : tag;

    return createElement(
      InnerComponent,
      { ...primitiveProps, className: cx(className), ref },
      props.children,
    );
  });

  Component.displayName = `Skribble(${
    typeof tag === 'string' ? tag : tag.displayName || tag.name || 'Component'
  })`;

  return Component;
};

// Add all the primitives to the component.
for (const primitive of primitives) {
  _sk[primitive] = _sk(primitive);
}

type SkribbleComponentFunction = <Tag extends ElementType>(
  tag: Tag,
) => PrimitiveForwardRefComponent<Tag>;

export type SkribbleComponent = SkribblePrimitives & SkribbleComponentFunction;

/**
 * This is the `skribble` component map which injects the className styles
 * provided by `@vanilla-extract/css` into the components.
 *
 * It is similar to `styled` from `styled-components` and emotion where you can
 * use `skribble.a` as a component.
 */
export const sk: SkribbleComponent = _sk;

export type { SkribbleComponent, SkribbleComponentFunction };

export { type SkribblePrimitives as Primitives } from './primitives';
