import { sk } from '..';
import { c } from '@skribble-css/client';

export const PrimitiveWithClassNames = () => {
  return <sk.button className={[c.md.p.$16, c.$group, c.$invisible]}>A button</sk.button>;
};

export const PrimitiveWithSlots = () => {
  return (
    <sk.button className={[c.md.p.$16, c.$group, c.$invisible]} asChild>
      <sk.a href='#'>a link</sk.a>
    </sk.button>
  );
};
