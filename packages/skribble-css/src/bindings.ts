/**
 * Auto generated by `generate-napi-types.ts`
 *
 * Do not edit manually
 */

export declare namespace Bindings {
  export type JsQueryEngine = QueryEngine;
  export class QueryEngine {
    static withInitialCount(count: number): JsQueryEngine;
    /** Class method */
    query(query: string): Promise<string>;
    status(): number;
  }
}
