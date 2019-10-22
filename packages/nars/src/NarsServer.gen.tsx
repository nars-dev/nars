/* TypeScript file generated by genType. */
/* eslint-disable import/first */


// tslint:disable-next-line:no-var-requires
const Curry = require('bs-platform/lib/js/curry.js');

// tslint:disable-next-line:no-var-requires
const NarsServerBS = require('./NarsServer.bs');

import {Dict_t as Js_Dict_t} from '../src/shims/Js.shim';

import {Internal_meth as Js_Internal_meth} from '../src/shims/Js.shim';

import {Json_t as Js_Json_t} from '../src/shims/Js.shim';

import {reactElement as ReactReconciler_reactElement} from '../src/shims/ReactReconciler.shim';

// tslint:disable-next-line:max-classes-per-file 
export abstract class Socket_data { protected opaque!: any }; /* simulate opaque types */

// tslint:disable-next-line:interface-over-type-literal
export type Socket_t = {
  readonly on: Js_Internal_meth<
  | {
    tag: "Arity_2"; 
    value: [string, (_1:Socket_data) => void]
  },void>; 
  binaryType: string; 
  readonly send: Js_Internal_meth<
  | {
    tag: "Arity_1"; 
    value: Socket_data
  },void>
};

// tslint:disable-next-line:interface-over-type-literal
export type socket = Socket_t;

// tslint:disable-next-line:interface-over-type-literal
export type Server_t = { readonly on: Js_Internal_meth<
  | { tag: "Arity_2"; value: [string, (_1:socket) => void] },void> };

// tslint:disable-next-line:interface-over-type-literal
export type server = Server_t;

// tslint:disable-next-line:interface-over-type-literal
export type componentSpec = {
  readonly name: string; 
  readonly localProps: string[]; 
  readonly props: Js_Dict_t<Js_Json_t>
};

export const startListening: (_1:server, _2:((_1:componentSpec) => ReactReconciler_reactElement)) => void = function (Arg1: any, Arg2: any) {
  const result = Curry._2(NarsServerBS.startListening, Arg1, Arg2);
  return result
};
