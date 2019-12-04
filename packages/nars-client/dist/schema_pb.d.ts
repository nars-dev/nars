// package: 
// file: schema.proto

import * as jspb from "google-protobuf";
import * as struct_pb from "./struct_pb";
import * as nars_animated_pb from "./nars_animated_pb";

export class StringValue extends jspb.Message {
  getValue(): string;
  setValue(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StringValue.AsObject;
  static toObject(includeInstance: boolean, msg: StringValue): StringValue.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StringValue, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StringValue;
  static deserializeBinaryFromReader(message: StringValue, reader: jspb.BinaryReader): StringValue;
}

export namespace StringValue {
  export type AsObject = {
    value: string,
  }
}

export class Int32Value extends jspb.Message {
  getValue(): number;
  setValue(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Int32Value.AsObject;
  static toObject(includeInstance: boolean, msg: Int32Value): Int32Value.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Int32Value, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Int32Value;
  static deserializeBinaryFromReader(message: Int32Value, reader: jspb.BinaryReader): Int32Value;
}

export namespace Int32Value {
  export type AsObject = {
    value: number,
  }
}

export class Callback extends jspb.Message {
  getCallid(): number;
  setCallid(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Callback.AsObject;
  static toObject(includeInstance: boolean, msg: Callback): Callback.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Callback, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Callback;
  static deserializeBinaryFromReader(message: Callback, reader: jspb.BinaryReader): Callback;
}

export namespace Callback {
  export type AsObject = {
    callid: number,
  }
}

export class LocalProp extends jspb.Message {
  getLocalkey(): string;
  setLocalkey(value: string): void;

  getPropkey(): string;
  setPropkey(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LocalProp.AsObject;
  static toObject(includeInstance: boolean, msg: LocalProp): LocalProp.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LocalProp, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LocalProp;
  static deserializeBinaryFromReader(message: LocalProp, reader: jspb.BinaryReader): LocalProp;
}

export namespace LocalProp {
  export type AsObject = {
    localkey: string,
    propkey: string,
  }
}

export class FloatValue extends jspb.Message {
  getValue(): number;
  setValue(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FloatValue.AsObject;
  static toObject(includeInstance: boolean, msg: FloatValue): FloatValue.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FloatValue, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FloatValue;
  static deserializeBinaryFromReader(message: FloatValue, reader: jspb.BinaryReader): FloatValue;
}

export namespace FloatValue {
  export type AsObject = {
    value: number,
  }
}

export class CustomComponent extends jspb.Message {
  getTypeId(): string;
  setTypeId(value: string): void;

  getContents(): Uint8Array | string;
  getContents_asU8(): Uint8Array;
  getContents_asB64(): string;
  setContents(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CustomComponent.AsObject;
  static toObject(includeInstance: boolean, msg: CustomComponent): CustomComponent.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CustomComponent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CustomComponent;
  static deserializeBinaryFromReader(message: CustomComponent, reader: jspb.BinaryReader): CustomComponent;
}

export namespace CustomComponent {
  export type AsObject = {
    typeId: string,
    contents: Uint8Array | string,
  }
}

export class View extends jspb.Message {
  hasStyle(): boolean;
  clearStyle(): void;
  getStyle(): struct_pb.Struct | undefined;
  setStyle(value?: struct_pb.Struct): void;

  clearChildrenList(): void;
  getChildrenList(): Array<ReactElement>;
  setChildrenList(value: Array<ReactElement>): void;
  addChildren(value?: ReactElement, index?: number): ReactElement;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): View.AsObject;
  static toObject(includeInstance: boolean, msg: View): View.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: View, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): View;
  static deserializeBinaryFromReader(message: View, reader: jspb.BinaryReader): View;
}

export namespace View {
  export type AsObject = {
    style?: struct_pb.Struct.AsObject,
    childrenList: Array<ReactElement.AsObject>,
  }
}

export class FlatList extends jspb.Message {
  hasStyle(): boolean;
  clearStyle(): void;
  getStyle(): struct_pb.Struct | undefined;
  setStyle(value?: struct_pb.Struct): void;

  hasOnendreached(): boolean;
  clearOnendreached(): void;
  getOnendreached(): Callback | undefined;
  setOnendreached(value?: Callback): void;

  hasOnendreachedthreshold(): boolean;
  clearOnendreachedthreshold(): void;
  getOnendreachedthreshold(): Int32Value | undefined;
  setOnendreachedthreshold(value?: Int32Value): void;

  clearChildrenList(): void;
  getChildrenList(): Array<ReactElement>;
  setChildrenList(value: Array<ReactElement>): void;
  addChildren(value?: ReactElement, index?: number): ReactElement;

  clearLocalpropsList(): void;
  getLocalpropsList(): Array<LocalProp>;
  setLocalpropsList(value: Array<LocalProp>): void;
  addLocalprops(value?: LocalProp, index?: number): LocalProp;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FlatList.AsObject;
  static toObject(includeInstance: boolean, msg: FlatList): FlatList.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FlatList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FlatList;
  static deserializeBinaryFromReader(message: FlatList, reader: jspb.BinaryReader): FlatList;
}

export namespace FlatList {
  export type AsObject = {
    style?: struct_pb.Struct.AsObject,
    onendreached?: Callback.AsObject,
    onendreachedthreshold?: Int32Value.AsObject,
    childrenList: Array<ReactElement.AsObject>,
    localpropsList: Array<LocalProp.AsObject>,
  }
}

export class TouchableOpacity extends jspb.Message {
  hasOnpress(): boolean;
  clearOnpress(): void;
  getOnpress(): Callback | undefined;
  setOnpress(value?: Callback): void;

  clearChildrenList(): void;
  getChildrenList(): Array<ReactElement>;
  setChildrenList(value: Array<ReactElement>): void;
  addChildren(value?: ReactElement, index?: number): ReactElement;

  clearLocalpropsList(): void;
  getLocalpropsList(): Array<LocalProp>;
  setLocalpropsList(value: Array<LocalProp>): void;
  addLocalprops(value?: LocalProp, index?: number): LocalProp;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TouchableOpacity.AsObject;
  static toObject(includeInstance: boolean, msg: TouchableOpacity): TouchableOpacity.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TouchableOpacity, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TouchableOpacity;
  static deserializeBinaryFromReader(message: TouchableOpacity, reader: jspb.BinaryReader): TouchableOpacity;
}

export namespace TouchableOpacity {
  export type AsObject = {
    onpress?: Callback.AsObject,
    childrenList: Array<ReactElement.AsObject>,
    localpropsList: Array<LocalProp.AsObject>,
  }
}

export class RawText extends jspb.Message {
  getText(): string;
  setText(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RawText.AsObject;
  static toObject(includeInstance: boolean, msg: RawText): RawText.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RawText, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RawText;
  static deserializeBinaryFromReader(message: RawText, reader: jspb.BinaryReader): RawText;
}

export namespace RawText {
  export type AsObject = {
    text: string,
  }
}

export class Text extends jspb.Message {
  hasStyle(): boolean;
  clearStyle(): void;
  getStyle(): struct_pb.Struct | undefined;
  setStyle(value?: struct_pb.Struct): void;

  clearChildrenList(): void;
  getChildrenList(): Array<ReactElement>;
  setChildrenList(value: Array<ReactElement>): void;
  addChildren(value?: ReactElement, index?: number): ReactElement;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Text.AsObject;
  static toObject(includeInstance: boolean, msg: Text): Text.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Text, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Text;
  static deserializeBinaryFromReader(message: Text, reader: jspb.BinaryReader): Text;
}

export namespace Text {
  export type AsObject = {
    style?: struct_pb.Struct.AsObject,
    childrenList: Array<ReactElement.AsObject>,
  }
}

export class TextInput extends jspb.Message {
  hasStyle(): boolean;
  clearStyle(): void;
  getStyle(): struct_pb.Struct | undefined;
  setStyle(value?: struct_pb.Struct): void;

  hasPlaceholdertextcolor(): boolean;
  clearPlaceholdertextcolor(): void;
  getPlaceholdertextcolor(): StringValue | undefined;
  setPlaceholdertextcolor(value?: StringValue): void;

  hasPlaceholder(): boolean;
  clearPlaceholder(): void;
  getPlaceholder(): StringValue | undefined;
  setPlaceholder(value?: StringValue): void;

  getValue(): string;
  setValue(value: string): void;

  clearLocalpropsList(): void;
  getLocalpropsList(): Array<LocalProp>;
  setLocalpropsList(value: Array<LocalProp>): void;
  addLocalprops(value?: LocalProp, index?: number): LocalProp;

  hasOnvaluechange(): boolean;
  clearOnvaluechange(): void;
  getOnvaluechange(): Callback | undefined;
  setOnvaluechange(value?: Callback): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TextInput.AsObject;
  static toObject(includeInstance: boolean, msg: TextInput): TextInput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TextInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TextInput;
  static deserializeBinaryFromReader(message: TextInput, reader: jspb.BinaryReader): TextInput;
}

export namespace TextInput {
  export type AsObject = {
    style?: struct_pb.Struct.AsObject,
    placeholdertextcolor?: StringValue.AsObject,
    placeholder?: StringValue.AsObject,
    value: string,
    localpropsList: Array<LocalProp.AsObject>,
    onvaluechange?: Callback.AsObject,
  }
}

export class Switch extends jspb.Message {
  hasStyle(): boolean;
  clearStyle(): void;
  getStyle(): struct_pb.Struct | undefined;
  setStyle(value?: struct_pb.Struct): void;

  getValue(): boolean;
  setValue(value: boolean): void;

  hasOnvaluechange(): boolean;
  clearOnvaluechange(): void;
  getOnvaluechange(): Callback | undefined;
  setOnvaluechange(value?: Callback): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Switch.AsObject;
  static toObject(includeInstance: boolean, msg: Switch): Switch.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Switch, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Switch;
  static deserializeBinaryFromReader(message: Switch, reader: jspb.BinaryReader): Switch;
}

export namespace Switch {
  export type AsObject = {
    style?: struct_pb.Struct.AsObject,
    value: boolean,
    onvaluechange?: Callback.AsObject,
  }
}

export class Image extends jspb.Message {
  hasStyle(): boolean;
  clearStyle(): void;
  getStyle(): struct_pb.Struct | undefined;
  setStyle(value?: struct_pb.Struct): void;

  getSourceurlstring(): string;
  setSourceurlstring(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Image.AsObject;
  static toObject(includeInstance: boolean, msg: Image): Image.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Image, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Image;
  static deserializeBinaryFromReader(message: Image, reader: jspb.BinaryReader): Image;
}

export namespace Image {
  export type AsObject = {
    style?: struct_pb.Struct.AsObject,
    sourceurlstring: string,
  }
}

export class ReactElement extends jspb.Message {
  hasKey(): boolean;
  clearKey(): void;
  getKey(): StringValue | undefined;
  setKey(value?: StringValue): void;

  hasCustom(): boolean;
  clearCustom(): void;
  getCustom(): CustomComponent | undefined;
  setCustom(value?: CustomComponent): void;

  hasView(): boolean;
  clearView(): void;
  getView(): View | undefined;
  setView(value?: View): void;

  hasFlatlist(): boolean;
  clearFlatlist(): void;
  getFlatlist(): FlatList | undefined;
  setFlatlist(value?: FlatList): void;

  hasTouchableopacity(): boolean;
  clearTouchableopacity(): void;
  getTouchableopacity(): TouchableOpacity | undefined;
  setTouchableopacity(value?: TouchableOpacity): void;

  hasTextinput(): boolean;
  clearTextinput(): void;
  getTextinput(): TextInput | undefined;
  setTextinput(value?: TextInput): void;

  hasText(): boolean;
  clearText(): void;
  getText(): Text | undefined;
  setText(value?: Text): void;

  hasRawtext(): boolean;
  clearRawtext(): void;
  getRawtext(): RawText | undefined;
  setRawtext(value?: RawText): void;

  hasSwitch(): boolean;
  clearSwitch(): void;
  getSwitch(): Switch | undefined;
  setSwitch(value?: Switch): void;

  hasImage(): boolean;
  clearImage(): void;
  getImage(): Image | undefined;
  setImage(value?: Image): void;

  hasAnimatedtext(): boolean;
  clearAnimatedtext(): void;
  getAnimatedtext(): AnimatedText | undefined;
  setAnimatedtext(value?: AnimatedText): void;

  hasAnimatedview(): boolean;
  clearAnimatedview(): void;
  getAnimatedview(): AnimatedView | undefined;
  setAnimatedview(value?: AnimatedView): void;

  hasAnimatedimage(): boolean;
  clearAnimatedimage(): void;
  getAnimatedimage(): AnimatedImage | undefined;
  setAnimatedimage(value?: AnimatedImage): void;

  getValueCase(): ReactElement.ValueCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ReactElement.AsObject;
  static toObject(includeInstance: boolean, msg: ReactElement): ReactElement.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ReactElement, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ReactElement;
  static deserializeBinaryFromReader(message: ReactElement, reader: jspb.BinaryReader): ReactElement;
}

export namespace ReactElement {
  export type AsObject = {
    key?: StringValue.AsObject,
    custom?: CustomComponent.AsObject,
    view?: View.AsObject,
    flatlist?: FlatList.AsObject,
    touchableopacity?: TouchableOpacity.AsObject,
    textinput?: TextInput.AsObject,
    text?: Text.AsObject,
    rawtext?: RawText.AsObject,
    pb_switch?: Switch.AsObject,
    image?: Image.AsObject,
    animatedtext?: AnimatedText.AsObject,
    animatedview?: AnimatedView.AsObject,
    animatedimage?: AnimatedImage.AsObject,
  }

  export enum ValueCase {
    VALUE_NOT_SET = 0,
    CUSTOM = 2,
    VIEW = 3,
    FLATLIST = 4,
    TOUCHABLEOPACITY = 5,
    TEXTINPUT = 6,
    TEXT = 7,
    RAWTEXT = 8,
    SWITCH = 9,
    IMAGE = 10,
    ANIMATEDTEXT = 11,
    ANIMATEDVIEW = 12,
    ANIMATEDIMAGE = 13,
  }
}

export class Unmount extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Unmount.AsObject;
  static toObject(includeInstance: boolean, msg: Unmount): Unmount.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Unmount, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Unmount;
  static deserializeBinaryFromReader(message: Unmount, reader: jspb.BinaryReader): Unmount;
}

export namespace Unmount {
  export type AsObject = {
  }
}

export class Render extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  hasProps(): boolean;
  clearProps(): void;
  getProps(): struct_pb.Struct | undefined;
  setProps(value?: struct_pb.Struct): void;

  clearLocalpropsList(): void;
  getLocalpropsList(): Array<string>;
  setLocalpropsList(value: Array<string>): void;
  addLocalprops(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Render.AsObject;
  static toObject(includeInstance: boolean, msg: Render): Render.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Render, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Render;
  static deserializeBinaryFromReader(message: Render, reader: jspb.BinaryReader): Render;
}

export namespace Render {
  export type AsObject = {
    name: string,
    props?: struct_pb.Struct.AsObject,
    localpropsList: Array<string>,
  }
}

export class Call extends jspb.Message {
  getMessageid(): number;
  setMessageid(value: number): void;

  hasArgs(): boolean;
  clearArgs(): void;
  getArgs(): struct_pb.Struct | undefined;
  setArgs(value?: struct_pb.Struct): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Call.AsObject;
  static toObject(includeInstance: boolean, msg: Call): Call.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Call, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Call;
  static deserializeBinaryFromReader(message: Call, reader: jspb.BinaryReader): Call;
}

export namespace Call {
  export type AsObject = {
    messageid: number,
    args?: struct_pb.Struct.AsObject,
  }
}

export class ClientToServer extends jspb.Message {
  getRootid(): number;
  setRootid(value: number): void;

  hasUnmount(): boolean;
  clearUnmount(): void;
  getUnmount(): Unmount | undefined;
  setUnmount(value?: Unmount): void;

  hasRender(): boolean;
  clearRender(): void;
  getRender(): Render | undefined;
  setRender(value?: Render): void;

  hasCall(): boolean;
  clearCall(): void;
  getCall(): Call | undefined;
  setCall(value?: Call): void;

  getValueCase(): ClientToServer.ValueCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientToServer.AsObject;
  static toObject(includeInstance: boolean, msg: ClientToServer): ClientToServer.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientToServer, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientToServer;
  static deserializeBinaryFromReader(message: ClientToServer, reader: jspb.BinaryReader): ClientToServer;
}

export namespace ClientToServer {
  export type AsObject = {
    rootid: number,
    unmount?: Unmount.AsObject,
    render?: Render.AsObject,
    call?: Call.AsObject,
  }

  export enum ValueCase {
    VALUE_NOT_SET = 0,
    UNMOUNT = 2,
    RENDER = 3,
    CALL = 4,
  }
}

export class Error extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Error.AsObject;
  static toObject(includeInstance: boolean, msg: Error): Error.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Error, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Error;
  static deserializeBinaryFromReader(message: Error, reader: jspb.BinaryReader): Error;
}

export namespace Error {
  export type AsObject = {
  }
}

export class Update extends jspb.Message {
  clearElementList(): void;
  getElementList(): Array<ReactElement>;
  setElementList(value: Array<ReactElement>): void;
  addElement(value?: ReactElement, index?: number): ReactElement;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Update.AsObject;
  static toObject(includeInstance: boolean, msg: Update): Update.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Update, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Update;
  static deserializeBinaryFromReader(message: Update, reader: jspb.BinaryReader): Update;
}

export namespace Update {
  export type AsObject = {
    elementList: Array<ReactElement.AsObject>,
  }
}

export class ServerToClient extends jspb.Message {
  getRootid(): number;
  setRootid(value: number): void;

  hasError(): boolean;
  clearError(): void;
  getError(): Error | undefined;
  setError(value?: Error): void;

  hasUpdate(): boolean;
  clearUpdate(): void;
  getUpdate(): Update | undefined;
  setUpdate(value?: Update): void;

  getValueCase(): ServerToClient.ValueCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ServerToClient.AsObject;
  static toObject(includeInstance: boolean, msg: ServerToClient): ServerToClient.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ServerToClient, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ServerToClient;
  static deserializeBinaryFromReader(message: ServerToClient, reader: jspb.BinaryReader): ServerToClient;
}

export namespace ServerToClient {
  export type AsObject = {
    rootid: number,
    error?: Error.AsObject,
    update?: Update.AsObject,
  }

  export enum ValueCase {
    VALUE_NOT_SET = 0,
    ERROR = 2,
    UPDATE = 3,
  }
}

export class AnimatedView extends jspb.Message {
  hasStyle(): boolean;
  clearStyle(): void;
  getStyle(): nars_animated_pb.Style | undefined;
  setStyle(value?: nars_animated_pb.Style): void;

  clearChildrenList(): void;
  getChildrenList(): Array<ReactElement>;
  setChildrenList(value: Array<ReactElement>): void;
  addChildren(value?: ReactElement, index?: number): ReactElement;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AnimatedView.AsObject;
  static toObject(includeInstance: boolean, msg: AnimatedView): AnimatedView.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AnimatedView, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AnimatedView;
  static deserializeBinaryFromReader(message: AnimatedView, reader: jspb.BinaryReader): AnimatedView;
}

export namespace AnimatedView {
  export type AsObject = {
    style?: nars_animated_pb.Style.AsObject,
    childrenList: Array<ReactElement.AsObject>,
  }
}

export class AnimatedText extends jspb.Message {
  hasStyle(): boolean;
  clearStyle(): void;
  getStyle(): nars_animated_pb.Style | undefined;
  setStyle(value?: nars_animated_pb.Style): void;

  clearChildrenList(): void;
  getChildrenList(): Array<ReactElement>;
  setChildrenList(value: Array<ReactElement>): void;
  addChildren(value?: ReactElement, index?: number): ReactElement;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AnimatedText.AsObject;
  static toObject(includeInstance: boolean, msg: AnimatedText): AnimatedText.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AnimatedText, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AnimatedText;
  static deserializeBinaryFromReader(message: AnimatedText, reader: jspb.BinaryReader): AnimatedText;
}

export namespace AnimatedText {
  export type AsObject = {
    style?: nars_animated_pb.Style.AsObject,
    childrenList: Array<ReactElement.AsObject>,
  }
}

export class AnimatedImage extends jspb.Message {
  hasStyle(): boolean;
  clearStyle(): void;
  getStyle(): nars_animated_pb.Style | undefined;
  setStyle(value?: nars_animated_pb.Style): void;

  getSourceurlstring(): string;
  setSourceurlstring(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AnimatedImage.AsObject;
  static toObject(includeInstance: boolean, msg: AnimatedImage): AnimatedImage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AnimatedImage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AnimatedImage;
  static deserializeBinaryFromReader(message: AnimatedImage, reader: jspb.BinaryReader): AnimatedImage;
}

export namespace AnimatedImage {
  export type AsObject = {
    style?: nars_animated_pb.Style.AsObject,
    sourceurlstring: string,
  }
}

