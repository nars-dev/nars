export enum CommonUserErrorT {
  CannotDecodeRpcCallArg,
  CannotEncodeRpcCallArg,
}

export class CommonUserError extends Error {
  type: CommonUserErrorT;
  humanReadable: string;
  constructor(type: CommonUserErrorT, humanReadable: string) {
    super(humanReadable);
    this.type = type;
    this.humanReadable = humanReadable;
  }
}

export const encodingArgError = () => {
  return new CommonUserError(
    CommonUserErrorT.CannotEncodeRpcCallArg,
    `Cannot encode parameters for an rpc call`
  );
}

export const decodingArgError = () => {
  return new CommonUserError(
    CommonUserErrorT.CannotEncodeRpcCallArg,
    `Cannot decode parameters for an rpc call`
  );
}
