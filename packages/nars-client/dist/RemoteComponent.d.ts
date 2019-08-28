import * as React from "react";
export declare type State = "Loading" | "Error" | {
    type: "Rendered";
    element: (React.ReactChild | null)[];
};
export declare const useNars: (wsOrAddress: string | WebSocket, name: string, props: object, localPropsOptional?: {
    [k: string]: unknown;
} | undefined) => State;
declare type Props = {
    webSocket: WebSocket | string;
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
export declare const RemoteComponent: (props: Props) => JSX.Element | null;
export {};
//# sourceMappingURL=RemoteComponent.d.ts.map