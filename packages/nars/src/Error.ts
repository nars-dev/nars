export enum UserErrorT {
  RequiredPropMissing,
  LocalPropMissing,
  BadCallbackArgType,
}

export class UserError extends Error {
  type: UserErrorT;
  humanReadable: string;
  constructor(type: UserErrorT, humanReadable: string) {
    super(humanReadable);
    this.type = type;
    this.humanReadable = humanReadable;
  }
}

export const requiredPropMissing = (
  key: string,
  componentName: any
): Error => {
  return new UserError(
    UserErrorT.RequiredPropMissing,
    `Decoding error: required prop: '${key}' has not been passed to component <${componentName} />`
  );
};

export const localPropMissing = (key: string, componentName: any): Error => {
  return new UserError(
    UserErrorT.LocalPropMissing,
    `Decoding error: local prop '${key}' has not been passed to component <${componentName} />`
  );
};

export const clientSideCallbackArgsEncodingError = (key: string) => {
  return new UserError(
    UserErrorT.BadCallbackArgType,
    `Cannot encode parameters for client side callback named '${key}'`
  );
}

