/**
 * This file contains types for props which never leave
 * the client device. So called "Local Props". For instance
 * you can pass a callback as a local prop and it'll be
 * executed without a server roundtrip. In the future
 * local and normal props will be unified.
 */

export interface LocalProp {
  readonly key: string;
}

export type LocalProps<Keys extends string> = { readonly [K in Keys]: LocalProp };
