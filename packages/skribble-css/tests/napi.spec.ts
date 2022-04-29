import { describe, expect, it } from 'vitest';

import { callThreadsafeFunction, SkribbleBridge } from '../';

declare global {
  // interface
  // var __skribble_css: any;
  // globalThis.AbortController
}

describe('playground', () => {
  it('can use threadsafe functions', () => {
    callThreadsafeFunction((n, value) => {
      console.log('received', value, n);
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

  it('can call threadsafe functions', () => {
    globalThis.__skribble_css = {};
    const bridge = new SkribbleBridge();
    const handlerName = 'TEST';
    bridge.addExtensionHandler(handlerName, (err, key) => {
      console.log('received', { key, err });
      // globalThis.__skribble_css[key] = { this: 'a', is: 'b', cool: 'c' };
    });

    const extract = bridge.callHandler(handlerName);
    console.log({ extract });
  });

  it.only('try delayed callbacks', () => {
    const bridge = new SkribbleBridge();
    bridge.addHandler2((object) => {
      console.log('OBJECT', object);
      return 'welcome!!';
    });

    console.log(
      bridge.callHandler2((object) => {
        console.log('OBJECT', object);
        return 'welcome!!';
      }),
    );
  });
});
