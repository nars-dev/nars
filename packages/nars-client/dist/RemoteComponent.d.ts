/// <reference types="react-native" />
import * as React from "react";
export declare type State = "Loading" | "Error" | {
    type: "Rendered";
    element: (React.ReactChild | null)[];
};
export interface SocketLike {
    binaryType: "arraybuffer" | "blob";
    readyState: number;
    send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void;
    addEventListener<K extends keyof WebSocketEventMap>(type: K, listener: (this: SocketLike, ev: WebSocketEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof WebSocketEventMap>(type: K, listener: (this: SocketLike, ev: WebSocketEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
}
declare type LocalProps = {
    [k: string]: unknown;
};
export declare const useNars: (webSocket: () => SocketLike, name: string, props: object, localPropsOptional?: LocalProps | undefined) => State;
export interface Lazy<T> {
    (): T;
}
declare type Props = {
    webSocket: SocketLike | Lazy<SocketLike>;
    name: string;
    props: {
        [k: string]: unknown;
    };
    localProps?: {
        [k: string]: unknown;
    };
    renderError?: () => React.ReactElement<any>;
    renderLoading?: () => React.ReactElement<any>;
};
export declare const useWebSocket: (url: string, shouldReconnect?: boolean | undefined) => Lazy<WebSocket>;
export declare const RemoteComponent: (props: Props) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | React.FunctionComponentElement<{}> | null;
export {};
//# sourceMappingURL=RemoteComponent.d.ts.map