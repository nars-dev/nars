import * as React from "react";
import * as Schema from "./schema_pb";
import { Struct } from "./struct_pb";
import { RetainedInstances } from "./AnimatedCoders";
/**
 * TODO: Reduce boilerplate
 */
export declare const ofEncodedReactElement: (rpcCall: (callId: number, args?: Struct | undefined) => void, getLocalProp: (key: string) => unknown, element: Schema.ReactElement, retainedInstances: RetainedInstances) => string | number | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | null;
//# sourceMappingURL=DecodeElement.d.ts.map