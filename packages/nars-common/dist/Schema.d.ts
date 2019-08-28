import * as $protobuf from "protobufjs";
export interface IStringValue {
    value?: (string|null);
}

export class StringValue implements IStringValue {
    constructor(properties?: IStringValue);
    public value: string;
    public static create(properties?: IStringValue): StringValue;
    public static encode(message: IStringValue, writer?: $protobuf.Writer): $protobuf.Writer;
    public static encodeDelimited(message: IStringValue, writer?: $protobuf.Writer): $protobuf.Writer;
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): StringValue;
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): StringValue;
    public static verify(message: { [k: string]: any }): (string|null);
    public static fromObject(object: { [k: string]: any }): StringValue;
    public static toObject(message: StringValue, options?: $protobuf.IConversionOptions): { [k: string]: any };
    public toJSON(): { [k: string]: any };
}

export interface IInt32Value {
    value?: (number|null);
}

export class Int32Value implements IInt32Value {
    constructor(properties?: IInt32Value);
    public value: number;
    public static create(properties?: IInt32Value): Int32Value;
    public static encode(message: IInt32Value, writer?: $protobuf.Writer): $protobuf.Writer;
    public static encodeDelimited(message: IInt32Value, writer?: $protobuf.Writer): $protobuf.Writer;
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Int32Value;
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Int32Value;
    public static verify(message: { [k: string]: any }): (string|null);
    public static fromObject(object: { [k: string]: any }): Int32Value;
    public static toObject(message: Int32Value, options?: $protobuf.IConversionOptions): { [k: string]: any };
    public toJSON(): { [k: string]: any };
}

export interface ICallback {
    callId?: (number|null);
}

export class Callback implements ICallback {
    constructor(properties?: ICallback);
    public callId: number;
    public static create(properties?: ICallback): Callback;
    public static encode(message: ICallback, writer?: $protobuf.Writer): $protobuf.Writer;
    public static encodeDelimited(message: ICallback, writer?: $protobuf.Writer): $protobuf.Writer;
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Callback;
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Callback;
    public static verify(message: { [k: string]: any }): (string|null);
    public static fromObject(object: { [k: string]: any }): Callback;
    public static toObject(message: Callback, options?: $protobuf.IConversionOptions): { [k: string]: any };
    public toJSON(): { [k: string]: any };
}

export interface ILocalProp {
    localKey?: (string|null);
    propKey?: (string|null);
}

export class LocalProp implements ILocalProp {
    constructor(properties?: ILocalProp);
    public localKey: string;
    public propKey: string;
    public static create(properties?: ILocalProp): LocalProp;
    public static encode(message: ILocalProp, writer?: $protobuf.Writer): $protobuf.Writer;
    public static encodeDelimited(message: ILocalProp, writer?: $protobuf.Writer): $protobuf.Writer;
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): LocalProp;
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): LocalProp;
    public static verify(message: { [k: string]: any }): (string|null);
    public static fromObject(object: { [k: string]: any }): LocalProp;
    public static toObject(message: LocalProp, options?: $protobuf.IConversionOptions): { [k: string]: any };
    public toJSON(): { [k: string]: any };
}

export interface ICustomComponent {
    typeId?: (string|null);
    contents?: (Uint8Array|null);
}

export class CustomComponent implements ICustomComponent {
    constructor(properties?: ICustomComponent);
    public typeId: string;
    public contents: Uint8Array;
    public static create(properties?: ICustomComponent): CustomComponent;
    public static encode(message: ICustomComponent, writer?: $protobuf.Writer): $protobuf.Writer;
    public static encodeDelimited(message: ICustomComponent, writer?: $protobuf.Writer): $protobuf.Writer;
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CustomComponent;
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CustomComponent;
    public static verify(message: { [k: string]: any }): (string|null);
    public static fromObject(object: { [k: string]: any }): CustomComponent;
    public static toObject(message: CustomComponent, options?: $protobuf.IConversionOptions): { [k: string]: any };
    public toJSON(): { [k: string]: any };
}

export interface IView {
    style?: (google.protobuf.IStruct|null);
    children?: (IReactElement[]|null);
}

export class View implements IView {
    constructor(properties?: IView);
    public style?: (google.protobuf.IStruct|null);
    public children: IReactElement[];
    public static create(properties?: IView): View;
    public static encode(message: IView, writer?: $protobuf.Writer): $protobuf.Writer;
    public static encodeDelimited(message: IView, writer?: $protobuf.Writer): $protobuf.Writer;
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): View;
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): View;
    public static verify(message: { [k: string]: any }): (string|null);
    public static fromObject(object: { [k: string]: any }): View;
    public static toObject(message: View, options?: $protobuf.IConversionOptions): { [k: string]: any };
    public toJSON(): { [k: string]: any };
}

export interface IKeyedChild {
    key?: (string|null);
    element?: (IReactElement|null);
}

export class KeyedChild implements IKeyedChild {
    constructor(properties?: IKeyedChild);
    public key: string;
    public element?: (IReactElement|null);
    public static create(properties?: IKeyedChild): KeyedChild;
    public static encode(message: IKeyedChild, writer?: $protobuf.Writer): $protobuf.Writer;
    public static encodeDelimited(message: IKeyedChild, writer?: $protobuf.Writer): $protobuf.Writer;
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): KeyedChild;
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): KeyedChild;
    public static verify(message: { [k: string]: any }): (string|null);
    public static fromObject(object: { [k: string]: any }): KeyedChild;
    public static toObject(message: KeyedChild, options?: $protobuf.IConversionOptions): { [k: string]: any };
    public toJSON(): { [k: string]: any };
}

export interface IFlatList {
    style?: (google.protobuf.IStruct|null);
    onEndReached?: (ICallback|null);
    onEndReachedThreshold?: (IInt32Value|null);
    keyedChildren?: (IKeyedChild[]|null);
    localProps?: (ILocalProp[]|null);
}

export class FlatList implements IFlatList {
    constructor(properties?: IFlatList);
    public style?: (google.protobuf.IStruct|null);
    public onEndReached?: (ICallback|null);
    public onEndReachedThreshold?: (IInt32Value|null);
    public keyedChildren: IKeyedChild[];
    public localProps: ILocalProp[];
    public static create(properties?: IFlatList): FlatList;
    public static encode(message: IFlatList, writer?: $protobuf.Writer): $protobuf.Writer;
    public static encodeDelimited(message: IFlatList, writer?: $protobuf.Writer): $protobuf.Writer;
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): FlatList;
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): FlatList;
    public static verify(message: { [k: string]: any }): (string|null);
    public static fromObject(object: { [k: string]: any }): FlatList;
    public static toObject(message: FlatList, options?: $protobuf.IConversionOptions): { [k: string]: any };
    public toJSON(): { [k: string]: any };
}

export interface ITouchableOpacity {
    onPress?: (ICallback|null);
    children?: (IReactElement[]|null);
    localProps?: (ILocalProp[]|null);
}

export class TouchableOpacity implements ITouchableOpacity {
    constructor(properties?: ITouchableOpacity);
    public onPress?: (ICallback|null);
    public children: IReactElement[];
    public localProps: ILocalProp[];
    public static create(properties?: ITouchableOpacity): TouchableOpacity;
    public static encode(message: ITouchableOpacity, writer?: $protobuf.Writer): $protobuf.Writer;
    public static encodeDelimited(message: ITouchableOpacity, writer?: $protobuf.Writer): $protobuf.Writer;
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): TouchableOpacity;
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): TouchableOpacity;
    public static verify(message: { [k: string]: any }): (string|null);
    public static fromObject(object: { [k: string]: any }): TouchableOpacity;
    public static toObject(message: TouchableOpacity, options?: $protobuf.IConversionOptions): { [k: string]: any };
    public toJSON(): { [k: string]: any };
}

export interface IRawText {
    text?: (string|null);
}

export class RawText implements IRawText {
    constructor(properties?: IRawText);
    public text: string;
    public static create(properties?: IRawText): RawText;
    public static encode(message: IRawText, writer?: $protobuf.Writer): $protobuf.Writer;
    public static encodeDelimited(message: IRawText, writer?: $protobuf.Writer): $protobuf.Writer;
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RawText;
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RawText;
    public static verify(message: { [k: string]: any }): (string|null);
    public static fromObject(object: { [k: string]: any }): RawText;
    public static toObject(message: RawText, options?: $protobuf.IConversionOptions): { [k: string]: any };
    public toJSON(): { [k: string]: any };
}

export interface IText {
    style?: (google.protobuf.IStruct|null);
    children?: (IReactElement[]|null);
}

export class Text implements IText {
    constructor(properties?: IText);
    public style?: (google.protobuf.IStruct|null);
    public children: IReactElement[];
    public static create(properties?: IText): Text;
    public static encode(message: IText, writer?: $protobuf.Writer): $protobuf.Writer;
    public static encodeDelimited(message: IText, writer?: $protobuf.Writer): $protobuf.Writer;
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Text;
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Text;
    public static verify(message: { [k: string]: any }): (string|null);
    public static fromObject(object: { [k: string]: any }): Text;
    public static toObject(message: Text, options?: $protobuf.IConversionOptions): { [k: string]: any };
    public toJSON(): { [k: string]: any };
}

export interface ITextInput {
    style?: (google.protobuf.IStruct|null);
    placeholderTextColor?: (IStringValue|null);
    placeholder?: (IStringValue|null);
    value?: (string|null);
    localProps?: (ILocalProp[]|null);
    onValueChange?: (ICallback|null);
}

export class TextInput implements ITextInput {
    constructor(properties?: ITextInput);
    public style?: (google.protobuf.IStruct|null);
    public placeholderTextColor?: (IStringValue|null);
    public placeholder?: (IStringValue|null);
    public value: string;
    public localProps: ILocalProp[];
    public onValueChange?: (ICallback|null);
    public static create(properties?: ITextInput): TextInput;
    public static encode(message: ITextInput, writer?: $protobuf.Writer): $protobuf.Writer;
    public static encodeDelimited(message: ITextInput, writer?: $protobuf.Writer): $protobuf.Writer;
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): TextInput;
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): TextInput;
    public static verify(message: { [k: string]: any }): (string|null);
    public static fromObject(object: { [k: string]: any }): TextInput;
    public static toObject(message: TextInput, options?: $protobuf.IConversionOptions): { [k: string]: any };
    public toJSON(): { [k: string]: any };
}

export interface ISwitch {
    style?: (google.protobuf.IStruct|null);
    value?: (boolean|null);
    onValueChange?: (ICallback|null);
}

export class Switch implements ISwitch {
    constructor(properties?: ISwitch);
    public style?: (google.protobuf.IStruct|null);
    public value: boolean;
    public onValueChange?: (ICallback|null);
    public static create(properties?: ISwitch): Switch;
    public static encode(message: ISwitch, writer?: $protobuf.Writer): $protobuf.Writer;
    public static encodeDelimited(message: ISwitch, writer?: $protobuf.Writer): $protobuf.Writer;
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Switch;
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Switch;
    public static verify(message: { [k: string]: any }): (string|null);
    public static fromObject(object: { [k: string]: any }): Switch;
    public static toObject(message: Switch, options?: $protobuf.IConversionOptions): { [k: string]: any };
    public toJSON(): { [k: string]: any };
}

export interface IImage {
    style?: (google.protobuf.IStruct|null);
    sourceURLString?: (string|null);
}

export class Image implements IImage {
    constructor(properties?: IImage);
    public style?: (google.protobuf.IStruct|null);
    public sourceURLString: string;
    public static create(properties?: IImage): Image;
    public static encode(message: IImage, writer?: $protobuf.Writer): $protobuf.Writer;
    public static encodeDelimited(message: IImage, writer?: $protobuf.Writer): $protobuf.Writer;
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Image;
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Image;
    public static verify(message: { [k: string]: any }): (string|null);
    public static fromObject(object: { [k: string]: any }): Image;
    public static toObject(message: Image, options?: $protobuf.IConversionOptions): { [k: string]: any };
    public toJSON(): { [k: string]: any };
}

export interface IReactElement {
    custom?: (ICustomComponent|null);
    view?: (IView|null);
    flatList?: (IFlatList|null);
    touchableOpacity?: (ITouchableOpacity|null);
    textInput?: (ITextInput|null);
    text?: (IText|null);
    rawText?: (IRawText|null);
    "switch"?: (ISwitch|null);
    image?: (IImage|null);
}

export class ReactElement implements IReactElement {
    constructor(properties?: IReactElement);
    public custom?: (ICustomComponent|null);
    public view?: (IView|null);
    public flatList?: (IFlatList|null);
    public touchableOpacity?: (ITouchableOpacity|null);
    public textInput?: (ITextInput|null);
    public text?: (IText|null);
    public rawText?: (IRawText|null);
    public switch?: (ISwitch|null);
    public image?: (IImage|null);
    public value?: ("custom"|"view"|"flatList"|"touchableOpacity"|"textInput"|"text"|"rawText"|"switch"|"image");
    public static create(properties?: IReactElement): ReactElement;
    public static encode(message: IReactElement, writer?: $protobuf.Writer): $protobuf.Writer;
    public static encodeDelimited(message: IReactElement, writer?: $protobuf.Writer): $protobuf.Writer;
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ReactElement;
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ReactElement;
    public static verify(message: { [k: string]: any }): (string|null);
    public static fromObject(object: { [k: string]: any }): ReactElement;
    public static toObject(message: ReactElement, options?: $protobuf.IConversionOptions): { [k: string]: any };
    public toJSON(): { [k: string]: any };
}

export interface IUnmount {
}

export class Unmount implements IUnmount {
    constructor(properties?: IUnmount);
    public static create(properties?: IUnmount): Unmount;
    public static encode(message: IUnmount, writer?: $protobuf.Writer): $protobuf.Writer;
    public static encodeDelimited(message: IUnmount, writer?: $protobuf.Writer): $protobuf.Writer;
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Unmount;
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Unmount;
    public static verify(message: { [k: string]: any }): (string|null);
    public static fromObject(object: { [k: string]: any }): Unmount;
    public static toObject(message: Unmount, options?: $protobuf.IConversionOptions): { [k: string]: any };
    public toJSON(): { [k: string]: any };
}

export interface IRender {
    name?: (string|null);
    props?: (google.protobuf.IStruct|null);
    localProps?: (string[]|null);
}

export class Render implements IRender {
    constructor(properties?: IRender);
    public name: string;
    public props?: (google.protobuf.IStruct|null);
    public localProps: string[];
    public static create(properties?: IRender): Render;
    public static encode(message: IRender, writer?: $protobuf.Writer): $protobuf.Writer;
    public static encodeDelimited(message: IRender, writer?: $protobuf.Writer): $protobuf.Writer;
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Render;
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Render;
    public static verify(message: { [k: string]: any }): (string|null);
    public static fromObject(object: { [k: string]: any }): Render;
    public static toObject(message: Render, options?: $protobuf.IConversionOptions): { [k: string]: any };
    public toJSON(): { [k: string]: any };
}

export interface ICall {
    messageId?: (number|null);
    args?: (google.protobuf.IStruct|null);
}

export class Call implements ICall {
    constructor(properties?: ICall);
    public messageId: number;
    public args?: (google.protobuf.IStruct|null);
    public static create(properties?: ICall): Call;
    public static encode(message: ICall, writer?: $protobuf.Writer): $protobuf.Writer;
    public static encodeDelimited(message: ICall, writer?: $protobuf.Writer): $protobuf.Writer;
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Call;
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Call;
    public static verify(message: { [k: string]: any }): (string|null);
    public static fromObject(object: { [k: string]: any }): Call;
    public static toObject(message: Call, options?: $protobuf.IConversionOptions): { [k: string]: any };
    public toJSON(): { [k: string]: any };
}

export interface IClientToServer {
    unmount?: (IUnmount|null);
    render?: (IRender|null);
    call?: (ICall|null);
    rootId?: (number|null);
}

export class ClientToServer implements IClientToServer {
    constructor(properties?: IClientToServer);
    public unmount?: (IUnmount|null);
    public render?: (IRender|null);
    public call?: (ICall|null);
    public rootId: number;
    public value?: ("unmount"|"render"|"call");
    public static create(properties?: IClientToServer): ClientToServer;
    public static encode(message: IClientToServer, writer?: $protobuf.Writer): $protobuf.Writer;
    public static encodeDelimited(message: IClientToServer, writer?: $protobuf.Writer): $protobuf.Writer;
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ClientToServer;
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ClientToServer;
    public static verify(message: { [k: string]: any }): (string|null);
    public static fromObject(object: { [k: string]: any }): ClientToServer;
    public static toObject(message: ClientToServer, options?: $protobuf.IConversionOptions): { [k: string]: any };
    public toJSON(): { [k: string]: any };
}

export interface IError {
}

export class Error implements IError {
    constructor(properties?: IError);
    public static create(properties?: IError): Error;
    public static encode(message: IError, writer?: $protobuf.Writer): $protobuf.Writer;
    public static encodeDelimited(message: IError, writer?: $protobuf.Writer): $protobuf.Writer;
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Error;
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Error;
    public static verify(message: { [k: string]: any }): (string|null);
    public static fromObject(object: { [k: string]: any }): Error;
    public static toObject(message: Error, options?: $protobuf.IConversionOptions): { [k: string]: any };
    public toJSON(): { [k: string]: any };
}

export interface IUpdate {
    element?: (IReactElement[]|null);
}

export class Update implements IUpdate {
    constructor(properties?: IUpdate);
    public element: IReactElement[];
    public static create(properties?: IUpdate): Update;
    public static encode(message: IUpdate, writer?: $protobuf.Writer): $protobuf.Writer;
    public static encodeDelimited(message: IUpdate, writer?: $protobuf.Writer): $protobuf.Writer;
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Update;
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Update;
    public static verify(message: { [k: string]: any }): (string|null);
    public static fromObject(object: { [k: string]: any }): Update;
    public static toObject(message: Update, options?: $protobuf.IConversionOptions): { [k: string]: any };
    public toJSON(): { [k: string]: any };
}

export interface IServerToClient {
    error?: (IError|null);
    update?: (IUpdate|null);
    rootId?: (number|null);
}

export class ServerToClient implements IServerToClient {
    constructor(properties?: IServerToClient);
    public error?: (IError|null);
    public update?: (IUpdate|null);
    public rootId: number;
    public value?: ("error"|"update");
    public static create(properties?: IServerToClient): ServerToClient;
    public static encode(message: IServerToClient, writer?: $protobuf.Writer): $protobuf.Writer;
    public static encodeDelimited(message: IServerToClient, writer?: $protobuf.Writer): $protobuf.Writer;
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ServerToClient;
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ServerToClient;
    public static verify(message: { [k: string]: any }): (string|null);
    public static fromObject(object: { [k: string]: any }): ServerToClient;
    public static toObject(message: ServerToClient, options?: $protobuf.IConversionOptions): { [k: string]: any };
    public toJSON(): { [k: string]: any };
}

export namespace google {

    namespace protobuf {

        interface IStruct {
            fields?: ({ [k: string]: google.protobuf.IValue }|null);
        }

        class Struct implements IStruct {
            constructor(properties?: google.protobuf.IStruct);
            public fields: { [k: string]: google.protobuf.IValue };
            public static create(properties?: google.protobuf.IStruct): google.protobuf.Struct;
            public static encode(message: google.protobuf.IStruct, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.IStruct, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Struct;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Struct;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): google.protobuf.Struct;
            public static toObject(message: google.protobuf.Struct, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        interface IValue {
            nullValue?: (google.protobuf.NullValue|null);
            numberValue?: (number|null);
            stringValue?: (string|null);
            boolValue?: (boolean|null);
            structValue?: (google.protobuf.IStruct|null);
            listValue?: (google.protobuf.IListValue|null);
        }

        class Value implements IValue {
            constructor(properties?: google.protobuf.IValue);
            public nullValue: google.protobuf.NullValue;
            public numberValue: number;
            public stringValue: string;
            public boolValue: boolean;
            public structValue?: (google.protobuf.IStruct|null);
            public listValue?: (google.protobuf.IListValue|null);
            public kind?: ("nullValue"|"numberValue"|"stringValue"|"boolValue"|"structValue"|"listValue");
            public static create(properties?: google.protobuf.IValue): google.protobuf.Value;
            public static encode(message: google.protobuf.IValue, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.IValue, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Value;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Value;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): google.protobuf.Value;
            public static toObject(message: google.protobuf.Value, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }

        enum NullValue {
            NULL_VALUE = 0
        }

        interface IListValue {
            values?: (google.protobuf.IValue[]|null);
        }

        class ListValue implements IListValue {
            constructor(properties?: google.protobuf.IListValue);
            public values: google.protobuf.IValue[];
            public static create(properties?: google.protobuf.IListValue): google.protobuf.ListValue;
            public static encode(message: google.protobuf.IListValue, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.IListValue, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.ListValue;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.ListValue;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): google.protobuf.ListValue;
            public static toObject(message: google.protobuf.ListValue, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }
    }
}
