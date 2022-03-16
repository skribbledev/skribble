import { describe, expect, it } from 'vitest';

import { callThreadsafeFunction, SkribbleBridge } from '../';

describe('playground', () => {
  it('can use threadsafe functions', () => {
    callThreadsafeFunction((_, value) => {
      // console.log('received', value, n);
      return value * 2;
    });
  });

  it('can create a class', () => {
    const bridge = new SkribbleBridge();
    const str = bridge.stringify({ hello: 'world' });
    expect(str).toMatchInlineSnapshot('"{\\"hello\\":\\"world\\"}"');
  });

  it('can store callbacks', () => {
    const bridge = new SkribbleBridge();
    console.log(bridge);
    bridge.addExtensionHandler('test', (object) => {
      console.log(object);
      return '';
    });

    console.log(bridge.callExtensionHandlers(() => 'awesome'));

    // expect(bridge.callExtensionHandlers()).toMatchInlineSnapshot();
  });
});
