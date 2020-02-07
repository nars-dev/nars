export enum UserErrorT {
  BadIncomingRpcCallId,
  BadRemoteComponentPropType,
  RequiredPropMissing,
  LocalPropMissing,
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

export const badIncomingRpcCallId = (id: number) => {
  return new UserError(
    UserErrorT.BadIncomingRpcCallId,
    `Callback with id '${id}' was not found`
  );
};

export const requiredPropMissing = (propKey: string, component: any) => {
  return new UserError(
    UserErrorT.RequiredPropMissing,
    `Required prop '${propKey}' has not been passed to <${component} />`
  );
};

export const badPropType = (propKey: string, prop: unknown, component: any) => {
  return new UserError(
    UserErrorT.BadRemoteComponentPropType,
    `Error encoding '${propKey}' with value:\n${prop}\npassed to <${component} />`
  );
};

export const localPropMissing = (propKey: string, component: any) => {
  return new UserError(
    UserErrorT.LocalPropMissing,
    `Local prop '${propKey}' has not been passed to <${component} />`
  );
};
