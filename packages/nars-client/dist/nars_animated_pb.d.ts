// package: nars.animated
// file: nars_animated.proto

import * as jspb from "google-protobuf";
import * as struct_pb from "./struct_pb";

export class EasingCustom extends jspb.Message {
  hasResult(): boolean;
  clearResult(): void;
  getResult(): Node | undefined;
  setResult(value?: Node): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EasingCustom.AsObject;
  static toObject(includeInstance: boolean, msg: EasingCustom): EasingCustom.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EasingCustom, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EasingCustom;
  static deserializeBinaryFromReader(message: EasingCustom, reader: jspb.BinaryReader): EasingCustom;
}

export namespace EasingCustom {
  export type AsObject = {
    result?: Node.AsObject,
  }
}

export class EasingStatic extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EasingStatic.AsObject;
  static toObject(includeInstance: boolean, msg: EasingStatic): EasingStatic.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EasingStatic, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EasingStatic;
  static deserializeBinaryFromReader(message: EasingStatic, reader: jspb.BinaryReader): EasingStatic;
}

export namespace EasingStatic {
  export type AsObject = {
  }
}

export class EasingFunction extends jspb.Message {
  hasBuiltin(): boolean;
  clearBuiltin(): void;
  getBuiltin(): EasingStatic | undefined;
  setBuiltin(value?: EasingStatic): void;

  hasCustom(): boolean;
  clearCustom(): void;
  getCustom(): EasingCustom | undefined;
  setCustom(value?: EasingCustom): void;

  getValueCase(): EasingFunction.ValueCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EasingFunction.AsObject;
  static toObject(includeInstance: boolean, msg: EasingFunction): EasingFunction.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EasingFunction, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EasingFunction;
  static deserializeBinaryFromReader(message: EasingFunction, reader: jspb.BinaryReader): EasingFunction;
}

export namespace EasingFunction {
  export type AsObject = {
    builtin?: EasingStatic.AsObject,
    custom?: EasingCustom.AsObject,
  }

  export enum ValueCase {
    VALUE_NOT_SET = 0,
    BUILTIN = 1,
    CUSTOM = 2,
  }
}

export class UnaryOperator extends jspb.Message {
  hasValue(): boolean;
  clearValue(): void;
  getValue(): Adaptable | undefined;
  setValue(value?: Adaptable): void;

  getOperator(): UnaryOperatorTypeMap[keyof UnaryOperatorTypeMap];
  setOperator(value: UnaryOperatorTypeMap[keyof UnaryOperatorTypeMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UnaryOperator.AsObject;
  static toObject(includeInstance: boolean, msg: UnaryOperator): UnaryOperator.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UnaryOperator, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UnaryOperator;
  static deserializeBinaryFromReader(message: UnaryOperator, reader: jspb.BinaryReader): UnaryOperator;
}

export namespace UnaryOperator {
  export type AsObject = {
    value?: Adaptable.AsObject,
    operator: UnaryOperatorTypeMap[keyof UnaryOperatorTypeMap],
  }
}

export class MultiOperator extends jspb.Message {
  hasA(): boolean;
  clearA(): void;
  getA(): Adaptable | undefined;
  setA(value?: Adaptable): void;

  hasB(): boolean;
  clearB(): void;
  getB(): Adaptable | undefined;
  setB(value?: Adaptable): void;

  clearOthersList(): void;
  getOthersList(): Array<Adaptable>;
  setOthersList(value: Array<Adaptable>): void;
  addOthers(value?: Adaptable, index?: number): Adaptable;

  getOperator(): MultiOperatorTypeMap[keyof MultiOperatorTypeMap];
  setOperator(value: MultiOperatorTypeMap[keyof MultiOperatorTypeMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MultiOperator.AsObject;
  static toObject(includeInstance: boolean, msg: MultiOperator): MultiOperator.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MultiOperator, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MultiOperator;
  static deserializeBinaryFromReader(message: MultiOperator, reader: jspb.BinaryReader): MultiOperator;
}

export namespace MultiOperator {
  export type AsObject = {
    a?: Adaptable.AsObject,
    b?: Adaptable.AsObject,
    othersList: Array<Adaptable.AsObject>,
    operator: MultiOperatorTypeMap[keyof MultiOperatorTypeMap],
  }
}

export class Condition extends jspb.Message {
  hasCondition(): boolean;
  clearCondition(): void;
  getCondition(): Adaptable | undefined;
  setCondition(value?: Adaptable): void;

  hasIfnode(): boolean;
  clearIfnode(): void;
  getIfnode(): Adaptable | undefined;
  setIfnode(value?: Adaptable): void;

  hasElsenode(): boolean;
  clearElsenode(): void;
  getElsenode(): Adaptable | undefined;
  setElsenode(value?: Adaptable): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Condition.AsObject;
  static toObject(includeInstance: boolean, msg: Condition): Condition.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Condition, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Condition;
  static deserializeBinaryFromReader(message: Condition, reader: jspb.BinaryReader): Condition;
}

export namespace Condition {
  export type AsObject = {
    condition?: Adaptable.AsObject,
    ifnode?: Adaptable.AsObject,
    elsenode?: Adaptable.AsObject,
  }
}

export class Value extends jspb.Message {
  hasFloat(): boolean;
  clearFloat(): void;
  getFloat(): number;
  setFloat(value: number): void;

  hasString(): boolean;
  clearString(): void;
  getString(): string;
  setString(value: string): void;

  hasBool(): boolean;
  clearBool(): void;
  getBool(): boolean;
  setBool(value: boolean): void;

  getNodeid(): number;
  setNodeid(value: number): void;

  getInitialvalueCase(): Value.InitialvalueCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Value.AsObject;
  static toObject(includeInstance: boolean, msg: Value): Value.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Value, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Value;
  static deserializeBinaryFromReader(message: Value, reader: jspb.BinaryReader): Value;
}

export namespace Value {
  export type AsObject = {
    pb_float: number,
    string: string,
    bool: boolean,
    Nodeid: number,
  }

  export enum InitialvalueCase {
    INITIALVALUE_NOT_SET = 0,
    FLOAT = 1,
    STRING = 2,
    BOOL = 3,
  }
}

export class Setter extends jspb.Message {
  hasValuetobeupdated(): boolean;
  clearValuetobeupdated(): void;
  getValuetobeupdated(): Value | undefined;
  setValuetobeupdated(value?: Value): void;

  hasTovalue(): boolean;
  clearTovalue(): void;
  getTovalue(): Adaptable | undefined;
  setTovalue(value?: Adaptable): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Setter.AsObject;
  static toObject(includeInstance: boolean, msg: Setter): Setter.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Setter, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Setter;
  static deserializeBinaryFromReader(message: Setter, reader: jspb.BinaryReader): Setter;
}

export namespace Setter {
  export type AsObject = {
    valuetobeupdated?: Value.AsObject,
    tovalue?: Adaptable.AsObject,
  }
}

export class UnaryDerivedOperator extends jspb.Message {
  hasValue(): boolean;
  clearValue(): void;
  getValue(): Adaptable | undefined;
  setValue(value?: Adaptable): void;

  getOperator(): UnaryDerivedOperatorTypeMap[keyof UnaryDerivedOperatorTypeMap];
  setOperator(value: UnaryDerivedOperatorTypeMap[keyof UnaryDerivedOperatorTypeMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UnaryDerivedOperator.AsObject;
  static toObject(includeInstance: boolean, msg: UnaryDerivedOperator): UnaryDerivedOperator.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UnaryDerivedOperator, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UnaryDerivedOperator;
  static deserializeBinaryFromReader(message: UnaryDerivedOperator, reader: jspb.BinaryReader): UnaryDerivedOperator;
}

export namespace UnaryDerivedOperator {
  export type AsObject = {
    value?: Adaptable.AsObject,
    operator: UnaryDerivedOperatorTypeMap[keyof UnaryDerivedOperatorTypeMap],
  }
}

export class BinaryOperator extends jspb.Message {
  getOperator(): BinaryOperatorTypeMap[keyof BinaryOperatorTypeMap];
  setOperator(value: BinaryOperatorTypeMap[keyof BinaryOperatorTypeMap]): void;

  hasLeft(): boolean;
  clearLeft(): void;
  getLeft(): Adaptable | undefined;
  setLeft(value?: Adaptable): void;

  hasRight(): boolean;
  clearRight(): void;
  getRight(): Adaptable | undefined;
  setRight(value?: Adaptable): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BinaryOperator.AsObject;
  static toObject(includeInstance: boolean, msg: BinaryOperator): BinaryOperator.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BinaryOperator, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BinaryOperator;
  static deserializeBinaryFromReader(message: BinaryOperator, reader: jspb.BinaryReader): BinaryOperator;
}

export namespace BinaryOperator {
  export type AsObject = {
    operator: BinaryOperatorTypeMap[keyof BinaryOperatorTypeMap],
    left?: Adaptable.AsObject,
    right?: Adaptable.AsObject,
  }
}

export class Color extends jspb.Message {
  hasR(): boolean;
  clearR(): void;
  getR(): Adaptable | undefined;
  setR(value?: Adaptable): void;

  hasG(): boolean;
  clearG(): void;
  getG(): Adaptable | undefined;
  setG(value?: Adaptable): void;

  hasB(): boolean;
  clearB(): void;
  getB(): Adaptable | undefined;
  setB(value?: Adaptable): void;

  hasAlpha(): boolean;
  clearAlpha(): void;
  getAlpha(): Adaptable | undefined;
  setAlpha(value?: Adaptable): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Color.AsObject;
  static toObject(includeInstance: boolean, msg: Color): Color.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Color, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Color;
  static deserializeBinaryFromReader(message: Color, reader: jspb.BinaryReader): Color;
}

export namespace Color {
  export type AsObject = {
    r?: Adaptable.AsObject,
    g?: Adaptable.AsObject,
    b?: Adaptable.AsObject,
    alpha?: Adaptable.AsObject,
  }
}

export class DiffClamp extends jspb.Message {
  hasValue(): boolean;
  clearValue(): void;
  getValue(): Adaptable | undefined;
  setValue(value?: Adaptable): void;

  hasMinval(): boolean;
  clearMinval(): void;
  getMinval(): Adaptable | undefined;
  setMinval(value?: Adaptable): void;

  hasMaxval(): boolean;
  clearMaxval(): void;
  getMaxval(): Adaptable | undefined;
  setMaxval(value?: Adaptable): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DiffClamp.AsObject;
  static toObject(includeInstance: boolean, msg: DiffClamp): DiffClamp.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DiffClamp, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DiffClamp;
  static deserializeBinaryFromReader(message: DiffClamp, reader: jspb.BinaryReader): DiffClamp;
}

export namespace DiffClamp {
  export type AsObject = {
    value?: Adaptable.AsObject,
    minval?: Adaptable.AsObject,
    maxval?: Adaptable.AsObject,
  }
}

export class Extrapolate extends jspb.Message {
  getValue(): ExtrapolateTypeMap[keyof ExtrapolateTypeMap];
  setValue(value: ExtrapolateTypeMap[keyof ExtrapolateTypeMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Extrapolate.AsObject;
  static toObject(includeInstance: boolean, msg: Extrapolate): Extrapolate.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Extrapolate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Extrapolate;
  static deserializeBinaryFromReader(message: Extrapolate, reader: jspb.BinaryReader): Extrapolate;
}

export namespace Extrapolate {
  export type AsObject = {
    value: ExtrapolateTypeMap[keyof ExtrapolateTypeMap],
  }
}

export class InterpolationConfig extends jspb.Message {
  clearInputrangeList(): void;
  getInputrangeList(): Array<Adaptable>;
  setInputrangeList(value: Array<Adaptable>): void;
  addInputrange(value?: Adaptable, index?: number): Adaptable;

  clearOutputrangeList(): void;
  getOutputrangeList(): Array<Adaptable>;
  setOutputrangeList(value: Array<Adaptable>): void;
  addOutputrange(value?: Adaptable, index?: number): Adaptable;

  hasExtrapolate(): boolean;
  clearExtrapolate(): void;
  getExtrapolate(): Extrapolate | undefined;
  setExtrapolate(value?: Extrapolate): void;

  hasExtrapolateleft(): boolean;
  clearExtrapolateleft(): void;
  getExtrapolateleft(): Extrapolate | undefined;
  setExtrapolateleft(value?: Extrapolate): void;

  hasExtrapolateright(): boolean;
  clearExtrapolateright(): void;
  getExtrapolateright(): Extrapolate | undefined;
  setExtrapolateright(value?: Extrapolate): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InterpolationConfig.AsObject;
  static toObject(includeInstance: boolean, msg: InterpolationConfig): InterpolationConfig.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: InterpolationConfig, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InterpolationConfig;
  static deserializeBinaryFromReader(message: InterpolationConfig, reader: jspb.BinaryReader): InterpolationConfig;
}

export namespace InterpolationConfig {
  export type AsObject = {
    inputrangeList: Array<Adaptable.AsObject>,
    outputrangeList: Array<Adaptable.AsObject>,
    extrapolate?: Extrapolate.AsObject,
    extrapolateleft?: Extrapolate.AsObject,
    extrapolateright?: Extrapolate.AsObject,
  }
}

export class Interpolate extends jspb.Message {
  hasValue(): boolean;
  clearValue(): void;
  getValue(): Adaptable | undefined;
  setValue(value?: Adaptable): void;

  hasConfig(): boolean;
  clearConfig(): void;
  getConfig(): InterpolationConfig | undefined;
  setConfig(value?: InterpolationConfig): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Interpolate.AsObject;
  static toObject(includeInstance: boolean, msg: Interpolate): Interpolate.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Interpolate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Interpolate;
  static deserializeBinaryFromReader(message: Interpolate, reader: jspb.BinaryReader): Interpolate;
}

export namespace Interpolate {
  export type AsObject = {
    value?: Adaptable.AsObject,
    config?: InterpolationConfig.AsObject,
  }
}

export class Block extends jspb.Message {
  clearValuesList(): void;
  getValuesList(): Array<Adaptable>;
  setValuesList(value: Array<Adaptable>): void;
  addValues(value?: Adaptable, index?: number): Adaptable;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Block.AsObject;
  static toObject(includeInstance: boolean, msg: Block): Block.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Block, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Block;
  static deserializeBinaryFromReader(message: Block, reader: jspb.BinaryReader): Block;
}

export namespace Block {
  export type AsObject = {
    valuesList: Array<Adaptable.AsObject>,
  }
}

export class Concat extends jspb.Message {
  clearValuesList(): void;
  getValuesList(): Array<Adaptable>;
  setValuesList(value: Array<Adaptable>): void;
  addValues(value?: Adaptable, index?: number): Adaptable;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Concat.AsObject;
  static toObject(includeInstance: boolean, msg: Concat): Concat.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Concat, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Concat;
  static deserializeBinaryFromReader(message: Concat, reader: jspb.BinaryReader): Concat;
}

export namespace Concat {
  export type AsObject = {
    valuesList: Array<Adaptable.AsObject>,
  }
}

export class Node extends jspb.Message {
  hasCond(): boolean;
  clearCond(): void;
  getCond(): Condition | undefined;
  setCond(value?: Condition): void;

  hasUnary(): boolean;
  clearUnary(): void;
  getUnary(): UnaryOperator | undefined;
  setUnary(value?: UnaryOperator): void;

  hasMulti(): boolean;
  clearMulti(): void;
  getMulti(): MultiOperator | undefined;
  setMulti(value?: MultiOperator): void;

  hasSetter(): boolean;
  clearSetter(): void;
  getSetter(): Setter | undefined;
  setSetter(value?: Setter): void;

  hasBinary(): boolean;
  clearBinary(): void;
  getBinary(): BinaryOperator | undefined;
  setBinary(value?: BinaryOperator): void;

  hasDerivedunary(): boolean;
  clearDerivedunary(): void;
  getDerivedunary(): UnaryDerivedOperator | undefined;
  setDerivedunary(value?: UnaryDerivedOperator): void;

  hasAnimation(): boolean;
  clearAnimation(): void;
  getAnimation(): Animation | undefined;
  setAnimation(value?: Animation): void;

  hasBlock(): boolean;
  clearBlock(): void;
  getBlock(): Block | undefined;
  setBlock(value?: Block): void;

  hasValue(): boolean;
  clearValue(): void;
  getValue(): Value | undefined;
  setValue(value?: Value): void;

  hasConcat(): boolean;
  clearConcat(): void;
  getConcat(): Concat | undefined;
  setConcat(value?: Concat): void;

  hasCall(): boolean;
  clearCall(): void;
  getCall(): Call | undefined;
  setCall(value?: Call): void;

  hasDebug(): boolean;
  clearDebug(): void;
  getDebug(): Debug | undefined;
  setDebug(value?: Debug): void;

  hasOnchange(): boolean;
  clearOnchange(): void;
  getOnchange(): OnChange | undefined;
  setOnchange(value?: OnChange): void;

  hasClockoperation(): boolean;
  clearClockoperation(): void;
  getClockoperation(): ClockOperation | undefined;
  setClockoperation(value?: ClockOperation): void;

  hasClock(): boolean;
  clearClock(): void;
  getClock(): Clock | undefined;
  setClock(value?: Clock): void;

  hasInterpolate(): boolean;
  clearInterpolate(): void;
  getInterpolate(): Interpolate | undefined;
  setInterpolate(value?: Interpolate): void;

  hasColor(): boolean;
  clearColor(): void;
  getColor(): Color | undefined;
  setColor(value?: Color): void;

  hasDiffclamp(): boolean;
  clearDiffclamp(): void;
  getDiffclamp(): DiffClamp | undefined;
  setDiffclamp(value?: DiffClamp): void;

  getInnernodeCase(): Node.InnernodeCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Node.AsObject;
  static toObject(includeInstance: boolean, msg: Node): Node.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Node, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Node;
  static deserializeBinaryFromReader(message: Node, reader: jspb.BinaryReader): Node;
}

export namespace Node {
  export type AsObject = {
    cond?: Condition.AsObject,
    unary?: UnaryOperator.AsObject,
    multi?: MultiOperator.AsObject,
    setter?: Setter.AsObject,
    binary?: BinaryOperator.AsObject,
    derivedunary?: UnaryDerivedOperator.AsObject,
    animation?: Animation.AsObject,
    block?: Block.AsObject,
    value?: Value.AsObject,
    concat?: Concat.AsObject,
    call?: Call.AsObject,
    debug?: Debug.AsObject,
    onchange?: OnChange.AsObject,
    clockoperation?: ClockOperation.AsObject,
    clock?: Clock.AsObject,
    interpolate?: Interpolate.AsObject,
    color?: Color.AsObject,
    diffclamp?: DiffClamp.AsObject,
  }

  export enum InnernodeCase {
    INNERNODE_NOT_SET = 0,
    COND = 1,
    UNARY = 2,
    MULTI = 3,
    SETTER = 4,
    BINARY = 5,
    DERIVEDUNARY = 6,
    ANIMATION = 7,
    BLOCK = 8,
    VALUE = 9,
    CONCAT = 10,
    CALL = 11,
    DEBUG = 12,
    ONCHANGE = 13,
    CLOCKOPERATION = 14,
    CLOCK = 15,
    INTERPOLATE = 16,
    COLOR = 17,
    DIFFCLAMP = 18,
  }
}

export class ValueArgument extends jspb.Message {
  getKey(): string;
  setKey(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ValueArgument.AsObject;
  static toObject(includeInstance: boolean, msg: ValueArgument): ValueArgument.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ValueArgument, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ValueArgument;
  static deserializeBinaryFromReader(message: ValueArgument, reader: jspb.BinaryReader): ValueArgument;
}

export namespace ValueArgument {
  export type AsObject = {
    key: string,
  }
}

export class Primitive extends jspb.Message {
  hasFloat(): boolean;
  clearFloat(): void;
  getFloat(): number;
  setFloat(value: number): void;

  hasString(): boolean;
  clearString(): void;
  getString(): string;
  setString(value: string): void;

  hasBool(): boolean;
  clearBool(): void;
  getBool(): boolean;
  setBool(value: boolean): void;

  getValueCase(): Primitive.ValueCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Primitive.AsObject;
  static toObject(includeInstance: boolean, msg: Primitive): Primitive.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Primitive, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Primitive;
  static deserializeBinaryFromReader(message: Primitive, reader: jspb.BinaryReader): Primitive;
}

export namespace Primitive {
  export type AsObject = {
    pb_float: number,
    string: string,
    bool: boolean,
  }

  export enum ValueCase {
    VALUE_NOT_SET = 0,
    FLOAT = 1,
    STRING = 2,
    BOOL = 3,
  }
}

export class Adaptable extends jspb.Message {
  hasPrimitive(): boolean;
  clearPrimitive(): void;
  getPrimitive(): Primitive | undefined;
  setPrimitive(value?: Primitive): void;

  hasNode(): boolean;
  clearNode(): void;
  getNode(): Node | undefined;
  setNode(value?: Node): void;

  getContainerCase(): Adaptable.ContainerCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Adaptable.AsObject;
  static toObject(includeInstance: boolean, msg: Adaptable): Adaptable.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Adaptable, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Adaptable;
  static deserializeBinaryFromReader(message: Adaptable, reader: jspb.BinaryReader): Adaptable;
}

export namespace Adaptable {
  export type AsObject = {
    primitive?: Primitive.AsObject,
    node?: Node.AsObject,
  }

  export enum ContainerCase {
    CONTAINER_NOT_SET = 0,
    PRIMITIVE = 1,
    NODE = 2,
  }
}

export class Call extends jspb.Message {
  clearArgsList(): void;
  getArgsList(): Array<Adaptable>;
  setArgsList(value: Array<Adaptable>): void;
  addArgs(value?: Adaptable, index?: number): Adaptable;

  getCallid(): number;
  setCallid(value: number): void;

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
    argsList: Array<Adaptable.AsObject>,
    callid: number,
  }
}

export class Debug extends jspb.Message {
  getDebugmessage(): string;
  setDebugmessage(value: string): void;

  hasValue(): boolean;
  clearValue(): void;
  getValue(): Node | undefined;
  setValue(value?: Node): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Debug.AsObject;
  static toObject(includeInstance: boolean, msg: Debug): Debug.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Debug, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Debug;
  static deserializeBinaryFromReader(message: Debug, reader: jspb.BinaryReader): Debug;
}

export namespace Debug {
  export type AsObject = {
    debugmessage: string,
    value?: Node.AsObject,
  }
}

export class OnChange extends jspb.Message {
  hasValue(): boolean;
  clearValue(): void;
  getValue(): Adaptable | undefined;
  setValue(value?: Adaptable): void;

  hasAction(): boolean;
  clearAction(): void;
  getAction(): Adaptable | undefined;
  setAction(value?: Adaptable): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OnChange.AsObject;
  static toObject(includeInstance: boolean, msg: OnChange): OnChange.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: OnChange, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OnChange;
  static deserializeBinaryFromReader(message: OnChange, reader: jspb.BinaryReader): OnChange;
}

export namespace OnChange {
  export type AsObject = {
    value?: Adaptable.AsObject,
    action?: Adaptable.AsObject,
  }
}

export class Clock extends jspb.Message {
  getNodeid(): number;
  setNodeid(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Clock.AsObject;
  static toObject(includeInstance: boolean, msg: Clock): Clock.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Clock, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Clock;
  static deserializeBinaryFromReader(message: Clock, reader: jspb.BinaryReader): Clock;
}

export namespace Clock {
  export type AsObject = {
    Nodeid: number,
  }
}

export class ClockOperation extends jspb.Message {
  hasClock(): boolean;
  clearClock(): void;
  getClock(): Clock | undefined;
  setClock(value?: Clock): void;

  getOperation(): ClockOperationTypeMap[keyof ClockOperationTypeMap];
  setOperation(value: ClockOperationTypeMap[keyof ClockOperationTypeMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClockOperation.AsObject;
  static toObject(includeInstance: boolean, msg: ClockOperation): ClockOperation.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClockOperation, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClockOperation;
  static deserializeBinaryFromReader(message: ClockOperation, reader: jspb.BinaryReader): ClockOperation;
}

export namespace ClockOperation {
  export type AsObject = {
    clock?: Clock.AsObject,
    operation: ClockOperationTypeMap[keyof ClockOperationTypeMap],
  }
}

export class AnimationState extends jspb.Message {
  hasFinished(): boolean;
  clearFinished(): void;
  getFinished(): Value | undefined;
  setFinished(value?: Value): void;

  hasPosition(): boolean;
  clearPosition(): void;
  getPosition(): Value | undefined;
  setPosition(value?: Value): void;

  hasTime(): boolean;
  clearTime(): void;
  getTime(): Value | undefined;
  setTime(value?: Value): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AnimationState.AsObject;
  static toObject(includeInstance: boolean, msg: AnimationState): AnimationState.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AnimationState, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AnimationState;
  static deserializeBinaryFromReader(message: AnimationState, reader: jspb.BinaryReader): AnimationState;
}

export namespace AnimationState {
  export type AsObject = {
    finished?: Value.AsObject,
    position?: Value.AsObject,
    time?: Value.AsObject,
  }
}

export class PhysicsAnimationState extends jspb.Message {
  hasAnimation(): boolean;
  clearAnimation(): void;
  getAnimation(): AnimationState | undefined;
  setAnimation(value?: AnimationState): void;

  hasVelocity(): boolean;
  clearVelocity(): void;
  getVelocity(): Value | undefined;
  setVelocity(value?: Value): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PhysicsAnimationState.AsObject;
  static toObject(includeInstance: boolean, msg: PhysicsAnimationState): PhysicsAnimationState.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PhysicsAnimationState, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PhysicsAnimationState;
  static deserializeBinaryFromReader(message: PhysicsAnimationState, reader: jspb.BinaryReader): PhysicsAnimationState;
}

export namespace PhysicsAnimationState {
  export type AsObject = {
    animation?: AnimationState.AsObject,
    velocity?: Value.AsObject,
  }
}

export class DecayConfig extends jspb.Message {
  hasDeceleration(): boolean;
  clearDeceleration(): void;
  getDeceleration(): Adaptable | undefined;
  setDeceleration(value?: Adaptable): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DecayConfig.AsObject;
  static toObject(includeInstance: boolean, msg: DecayConfig): DecayConfig.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DecayConfig, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DecayConfig;
  static deserializeBinaryFromReader(message: DecayConfig, reader: jspb.BinaryReader): DecayConfig;
}

export namespace DecayConfig {
  export type AsObject = {
    deceleration?: Adaptable.AsObject,
  }
}

export class DecayAnimation extends jspb.Message {
  hasClock(): boolean;
  clearClock(): void;
  getClock(): Clock | undefined;
  setClock(value?: Clock): void;

  hasState(): boolean;
  clearState(): void;
  getState(): PhysicsAnimationState | undefined;
  setState(value?: PhysicsAnimationState): void;

  hasConfig(): boolean;
  clearConfig(): void;
  getConfig(): DecayConfig | undefined;
  setConfig(value?: DecayConfig): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DecayAnimation.AsObject;
  static toObject(includeInstance: boolean, msg: DecayAnimation): DecayAnimation.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DecayAnimation, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DecayAnimation;
  static deserializeBinaryFromReader(message: DecayAnimation, reader: jspb.BinaryReader): DecayAnimation;
}

export namespace DecayAnimation {
  export type AsObject = {
    clock?: Clock.AsObject,
    state?: PhysicsAnimationState.AsObject,
    config?: DecayConfig.AsObject,
  }
}

export class TimingState extends jspb.Message {
  hasAnimation(): boolean;
  clearAnimation(): void;
  getAnimation(): AnimationState | undefined;
  setAnimation(value?: AnimationState): void;

  hasFrametime(): boolean;
  clearFrametime(): void;
  getFrametime(): Value | undefined;
  setFrametime(value?: Value): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TimingState.AsObject;
  static toObject(includeInstance: boolean, msg: TimingState): TimingState.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TimingState, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TimingState;
  static deserializeBinaryFromReader(message: TimingState, reader: jspb.BinaryReader): TimingState;
}

export namespace TimingState {
  export type AsObject = {
    animation?: AnimationState.AsObject,
    frametime?: Value.AsObject,
  }
}

export class TimingConfig extends jspb.Message {
  hasTovalue(): boolean;
  clearTovalue(): void;
  getTovalue(): Adaptable | undefined;
  setTovalue(value?: Adaptable): void;

  hasDuration(): boolean;
  clearDuration(): void;
  getDuration(): Adaptable | undefined;
  setDuration(value?: Adaptable): void;

  hasEasing(): boolean;
  clearEasing(): void;
  getEasing(): EasingFunction | undefined;
  setEasing(value?: EasingFunction): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TimingConfig.AsObject;
  static toObject(includeInstance: boolean, msg: TimingConfig): TimingConfig.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TimingConfig, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TimingConfig;
  static deserializeBinaryFromReader(message: TimingConfig, reader: jspb.BinaryReader): TimingConfig;
}

export namespace TimingConfig {
  export type AsObject = {
    tovalue?: Adaptable.AsObject,
    duration?: Adaptable.AsObject,
    easing?: EasingFunction.AsObject,
  }
}

export class TimingAnimation extends jspb.Message {
  hasClock(): boolean;
  clearClock(): void;
  getClock(): Clock | undefined;
  setClock(value?: Clock): void;

  hasState(): boolean;
  clearState(): void;
  getState(): TimingState | undefined;
  setState(value?: TimingState): void;

  hasConfig(): boolean;
  clearConfig(): void;
  getConfig(): TimingConfig | undefined;
  setConfig(value?: TimingConfig): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TimingAnimation.AsObject;
  static toObject(includeInstance: boolean, msg: TimingAnimation): TimingAnimation.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TimingAnimation, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TimingAnimation;
  static deserializeBinaryFromReader(message: TimingAnimation, reader: jspb.BinaryReader): TimingAnimation;
}

export namespace TimingAnimation {
  export type AsObject = {
    clock?: Clock.AsObject,
    state?: TimingState.AsObject,
    config?: TimingConfig.AsObject,
  }
}

export class SpringConfig extends jspb.Message {
  hasDamping(): boolean;
  clearDamping(): void;
  getDamping(): Adaptable | undefined;
  setDamping(value?: Adaptable): void;

  hasMass(): boolean;
  clearMass(): void;
  getMass(): Adaptable | undefined;
  setMass(value?: Adaptable): void;

  hasStiffness(): boolean;
  clearStiffness(): void;
  getStiffness(): Adaptable | undefined;
  setStiffness(value?: Adaptable): void;

  hasOvershootclamping(): boolean;
  clearOvershootclamping(): void;
  getOvershootclamping(): Adaptable | undefined;
  setOvershootclamping(value?: Adaptable): void;

  hasRestspeedthreshold(): boolean;
  clearRestspeedthreshold(): void;
  getRestspeedthreshold(): Adaptable | undefined;
  setRestspeedthreshold(value?: Adaptable): void;

  hasRestdisplacementthreshold(): boolean;
  clearRestdisplacementthreshold(): void;
  getRestdisplacementthreshold(): Adaptable | undefined;
  setRestdisplacementthreshold(value?: Adaptable): void;

  hasTovalue(): boolean;
  clearTovalue(): void;
  getTovalue(): Adaptable | undefined;
  setTovalue(value?: Adaptable): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SpringConfig.AsObject;
  static toObject(includeInstance: boolean, msg: SpringConfig): SpringConfig.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SpringConfig, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SpringConfig;
  static deserializeBinaryFromReader(message: SpringConfig, reader: jspb.BinaryReader): SpringConfig;
}

export namespace SpringConfig {
  export type AsObject = {
    damping?: Adaptable.AsObject,
    mass?: Adaptable.AsObject,
    stiffness?: Adaptable.AsObject,
    overshootclamping?: Adaptable.AsObject,
    restspeedthreshold?: Adaptable.AsObject,
    restdisplacementthreshold?: Adaptable.AsObject,
    tovalue?: Adaptable.AsObject,
  }
}

export class SpringAnimation extends jspb.Message {
  hasClock(): boolean;
  clearClock(): void;
  getClock(): Clock | undefined;
  setClock(value?: Clock): void;

  hasState(): boolean;
  clearState(): void;
  getState(): PhysicsAnimationState | undefined;
  setState(value?: PhysicsAnimationState): void;

  hasConfig(): boolean;
  clearConfig(): void;
  getConfig(): SpringConfig | undefined;
  setConfig(value?: SpringConfig): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SpringAnimation.AsObject;
  static toObject(includeInstance: boolean, msg: SpringAnimation): SpringAnimation.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SpringAnimation, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SpringAnimation;
  static deserializeBinaryFromReader(message: SpringAnimation, reader: jspb.BinaryReader): SpringAnimation;
}

export namespace SpringAnimation {
  export type AsObject = {
    clock?: Clock.AsObject,
    state?: PhysicsAnimationState.AsObject,
    config?: SpringConfig.AsObject,
  }
}

export class Animation extends jspb.Message {
  hasDecay(): boolean;
  clearDecay(): void;
  getDecay(): DecayAnimation | undefined;
  setDecay(value?: DecayAnimation): void;

  hasTiming(): boolean;
  clearTiming(): void;
  getTiming(): TimingAnimation | undefined;
  setTiming(value?: TimingAnimation): void;

  hasSpring(): boolean;
  clearSpring(): void;
  getSpring(): SpringAnimation | undefined;
  setSpring(value?: SpringAnimation): void;

  getAnimationCase(): Animation.AnimationCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Animation.AsObject;
  static toObject(includeInstance: boolean, msg: Animation): Animation.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Animation, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Animation;
  static deserializeBinaryFromReader(message: Animation, reader: jspb.BinaryReader): Animation;
}

export namespace Animation {
  export type AsObject = {
    decay?: DecayAnimation.AsObject,
    timing?: TimingAnimation.AsObject,
    spring?: SpringAnimation.AsObject,
  }

  export enum AnimationCase {
    ANIMATION_NOT_SET = 0,
    DECAY = 1,
    TIMING = 2,
    SPRING = 3,
  }
}

export class ListValue extends jspb.Message {
  clearValuesList(): void;
  getValuesList(): Array<ValueOrAnimatedNode>;
  setValuesList(value: Array<ValueOrAnimatedNode>): void;
  addValues(value?: ValueOrAnimatedNode, index?: number): ValueOrAnimatedNode;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListValue.AsObject;
  static toObject(includeInstance: boolean, msg: ListValue): ListValue.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListValue, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListValue;
  static deserializeBinaryFromReader(message: ListValue, reader: jspb.BinaryReader): ListValue;
}

export namespace ListValue {
  export type AsObject = {
    valuesList: Array<ValueOrAnimatedNode.AsObject>,
  }
}

export class TopLevelNode extends jspb.Message {
  hasNode(): boolean;
  clearNode(): void;
  getNode(): Node | undefined;
  setNode(value?: Node): void;

  getNodeid(): number;
  setNodeid(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TopLevelNode.AsObject;
  static toObject(includeInstance: boolean, msg: TopLevelNode): TopLevelNode.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TopLevelNode, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TopLevelNode;
  static deserializeBinaryFromReader(message: TopLevelNode, reader: jspb.BinaryReader): TopLevelNode;
}

export namespace TopLevelNode {
  export type AsObject = {
    node?: Node.AsObject,
    Nodeid: number,
  }
}

export class ValueOrAnimatedNode extends jspb.Message {
  hasNullValue(): boolean;
  clearNullValue(): void;
  getNullValue(): struct_pb.NullValueMap[keyof struct_pb.NullValueMap];
  setNullValue(value: struct_pb.NullValueMap[keyof struct_pb.NullValueMap]): void;

  hasNumberValue(): boolean;
  clearNumberValue(): void;
  getNumberValue(): number;
  setNumberValue(value: number): void;

  hasStringValue(): boolean;
  clearStringValue(): void;
  getStringValue(): string;
  setStringValue(value: string): void;

  hasBoolValue(): boolean;
  clearBoolValue(): void;
  getBoolValue(): boolean;
  setBoolValue(value: boolean): void;

  hasStyleValue(): boolean;
  clearStyleValue(): void;
  getStyleValue(): Style | undefined;
  setStyleValue(value?: Style): void;

  hasListValue(): boolean;
  clearListValue(): void;
  getListValue(): ListValue | undefined;
  setListValue(value?: ListValue): void;

  hasUndefinedValue(): boolean;
  clearUndefinedValue(): void;
  getUndefinedValue(): struct_pb.UndefinedValueMap[keyof struct_pb.UndefinedValueMap];
  setUndefinedValue(value: struct_pb.UndefinedValueMap[keyof struct_pb.UndefinedValueMap]): void;

  hasNode(): boolean;
  clearNode(): void;
  getNode(): TopLevelNode | undefined;
  setNode(value?: TopLevelNode): void;

  getKindCase(): ValueOrAnimatedNode.KindCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ValueOrAnimatedNode.AsObject;
  static toObject(includeInstance: boolean, msg: ValueOrAnimatedNode): ValueOrAnimatedNode.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ValueOrAnimatedNode, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ValueOrAnimatedNode;
  static deserializeBinaryFromReader(message: ValueOrAnimatedNode, reader: jspb.BinaryReader): ValueOrAnimatedNode;
}

export namespace ValueOrAnimatedNode {
  export type AsObject = {
    nullValue: struct_pb.NullValueMap[keyof struct_pb.NullValueMap],
    numberValue: number,
    stringValue: string,
    boolValue: boolean,
    styleValue?: Style.AsObject,
    listValue?: ListValue.AsObject,
    undefinedValue: struct_pb.UndefinedValueMap[keyof struct_pb.UndefinedValueMap],
    node?: TopLevelNode.AsObject,
  }

  export enum KindCase {
    KIND_NOT_SET = 0,
    NULL_VALUE = 1,
    NUMBER_VALUE = 2,
    STRING_VALUE = 3,
    BOOL_VALUE = 4,
    STYLE_VALUE = 5,
    LIST_VALUE = 6,
    UNDEFINED_VALUE = 7,
    NODE = 8,
  }
}

export class Style extends jspb.Message {
  getFieldsMap(): jspb.Map<string, ValueOrAnimatedNode>;
  clearFieldsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Style.AsObject;
  static toObject(includeInstance: boolean, msg: Style): Style.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Style, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Style;
  static deserializeBinaryFromReader(message: Style, reader: jspb.BinaryReader): Style;
}

export namespace Style {
  export type AsObject = {
    fieldsMap: Array<[string, ValueOrAnimatedNode.AsObject]>,
  }
}

export interface UnaryOperatorTypeMap {
  SQRT: 0;
  LOG: 1;
  SIN: 2;
  COS: 3;
  TAN: 4;
  ACOS: 5;
  ASIN: 6;
  ATAN: 7;
  EXP: 8;
  ROUND: 9;
  FLOOR: 10;
  CEIL: 11;
  DEFINED: 12;
  NOT: 13;
}

export const UnaryOperatorType: UnaryOperatorTypeMap;

export interface MultiOperatorTypeMap {
  ADD: 0;
  SUB: 1;
  MULTIPLY: 2;
  DIVIDE: 3;
  POW: 4;
  MODULO: 5;
  AND: 6;
  OR: 7;
}

export const MultiOperatorType: MultiOperatorTypeMap;

export interface UnaryDerivedOperatorTypeMap {
  ABS: 0;
  ACC: 1;
  DIFF: 2;
}

export const UnaryDerivedOperatorType: UnaryDerivedOperatorTypeMap;

export interface BinaryOperatorTypeMap {
  MAX: 0;
  MIN: 1;
  LESSTHAN: 2;
  EQ: 3;
  GREATERTHAN: 4;
  LESSOREQ: 5;
  GREATEROREQ: 6;
  NEQ: 7;
}

export const BinaryOperatorType: BinaryOperatorTypeMap;

export interface ExtrapolateTypeMap {
  EXTEND: 0;
  CLAMP: 1;
  IDENTITY: 2;
}

export const ExtrapolateType: ExtrapolateTypeMap;

export interface ClockOperationTypeMap {
  START: 0;
  STOP: 1;
  ISRUNNING: 2;
}

export const ClockOperationType: ClockOperationTypeMap;

