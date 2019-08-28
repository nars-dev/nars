import { ClientToServer as clientToServerJs } from './Schema';
import { ReactElement as reactElement } from './Schema';
import { Render as componentDescription } from './Schema';
import { ServerToClient as serverToClientJs } from './Schema';
export declare type reactElement = reactElement;
export declare type componentDescription = componentDescription;
export declare type clientToServerJs = clientToServerJs;
export declare type serverToClientJs = serverToClientJs;
export declare type id = number;
export declare type message<a> = {
    readonly id: id;
    readonly contents: a;
};
export declare type clientToServer = "Unmount" | {
    tag: "Render";
    value: componentDescription;
};
export declare type serverToClient = "Error" | {
    tag: "Update";
    value: reactElement;
};
export declare const clientToServerFromJS: (_1: clientToServerJs) => (null | undefined | message<clientToServer>);
export declare const serverToClientFromJS: (_1: serverToClientJs) => (null | undefined | message<serverToClient>);
//# sourceMappingURL=Messages_v1.gen.d.ts.map