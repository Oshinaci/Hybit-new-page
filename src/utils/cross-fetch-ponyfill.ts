// Safe cross-fetch replacement that avoids prototype pollution and "Cannot set property fetch of #<Window>" error
const g: any =
  (typeof globalThis !== 'undefined' && globalThis) ||
  (typeof window !== 'undefined' && window) ||
  (typeof self !== 'undefined' && self) ||
  (typeof global !== 'undefined' && global) ||
  {};

export const fetch: typeof globalThis.fetch =
  typeof g.fetch === 'function'
    ? g.fetch.bind(g)
    : typeof globalThis.fetch === 'function'
    ? globalThis.fetch.bind(globalThis)
    : (undefined as any);

export const Headers: typeof globalThis.Headers =
  typeof g.Headers !== 'undefined' ? g.Headers : globalThis.Headers;

export const Request: typeof globalThis.Request =
  typeof g.Request !== 'undefined' ? g.Request : globalThis.Request;

export const Response: typeof globalThis.Response =
  typeof g.Response !== 'undefined' ? g.Response : globalThis.Response;

export default fetch;
