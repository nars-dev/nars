// Type definitions for globals from react-native which are not included
// in es6 and react-native types.
// Copied from lib.dom.d.ts

type BinaryType = "blob" | "arraybuffer";

/** A CloseEvent is sent to clients using WebSockets when the connection is closed. This is delivered to the listener indicated by the WebSocket object's onclose attribute. */
interface CloseEvent extends Event {
  readonly code: number;
  readonly reason: string;
  readonly wasClean: boolean;
  /** @deprecated */
  initCloseEvent(
    typeArg: string,
    canBubbleArg: boolean,
    cancelableArg: boolean,
    wasCleanArg: boolean,
    codeArg: number,
    reasonArg: string
  ): void;
}

interface EventListenerObject {
  handleEvent(evt: Event): void;
}

interface EventListener {
  (evt: Event): void;
}

declare type EventListenerOrEventListenerObject =
  | EventListener
  | EventListenerObject;

interface ImageBitmap {
  /**
   * Returns the intrinsic height of the image, in CSS pixels.
   */
  readonly height: number;
  /**
   * Returns the intrinsic width of the image, in CSS pixels.
   */
  readonly width: number;
  /**
   * Releases imageBitmap's underlying bitmap data.
   */
  close(): void;
}

type Transferable = ArrayBuffer | MessagePort | ImageBitmap;

interface PostMessageOptions {
  transfer?: any[];
}

interface MessagePortEventMap {
  message: MessageEvent;
  messageerror: MessageEvent;
}

interface EventListenerOptions {
  capture?: boolean;
}

interface AddEventListenerOptions extends EventListenerOptions {
  once?: boolean;
  passive?: boolean;
}

/* Originally:
 * type MessageEventSource = WindowProxy | MessagePort | ServiceWorker;
 * but afaik WindowProxy and ServiceWorker don't exist in RN
 */
type MessageEventSource = MessagePort;

interface WebSocketEventMap {
  close: CloseEvent;
  error: Event;
  message: MessageEvent;
  open: Event;
}

/** This Channel Messaging API interface represents one of the two ports of a MessageChannel, allowing messages to be sent from one port and listening out for them arriving at the other. */
interface MessagePort extends EventTarget {
  onmessage: ((this: MessagePort, ev: MessageEvent) => any) | null;
  onmessageerror: ((this: MessagePort, ev: MessageEvent) => any) | null;
  /**
   * Disconnects the port, so that it is no longer active.
   */
  close(): void;
  /**
   * Posts a message through the channel. Objects listed in transfer are transferred, not just cloned, meaning that they are no longer usable on the sending side.
   *
   * Throws a "DataCloneError" DOMException if transfer contains duplicate objects or port, or if message could not be cloned.
   */
  postMessage(message: any, transfer: Transferable[]): void;
  postMessage(message: any, options?: PostMessageOptions): void;
  /**
   * Begins dispatching messages received on the port.
   */
  start(): void;
  addEventListener<K extends keyof MessagePortEventMap>(
    type: K,
    listener: (this: MessagePort, ev: MessagePortEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener<K extends keyof MessagePortEventMap>(
    type: K,
    listener: (this: MessagePort, ev: MessagePortEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void;
}

/** A message received by a target object. */
interface MessageEvent extends Event {
  /**
   * Returns the data of the message.
   */
  readonly data: any;
  /**
   * Returns the last event ID string, for server-sent events.
   */
  readonly lastEventId: string;
  /**
   * Returns the origin of the message, for server-sent events and cross-document messaging.
   */
  readonly origin: string;
  /**
   * Returns the MessagePort array sent with the message, for cross-document messaging and channel messaging.
   */
  readonly ports: ReadonlyArray<MessagePort>;
  /**
   * Returns the WindowProxy of the source window, for cross-document messaging, and the MessagePort being attached, in the connect event fired at SharedWorkerGlobalScope objects.
   */
  readonly source: MessageEventSource | null;
}

/** Provides the API for creating and managing a WebSocket connection to a server, as well as for sending and receiving data on the connection. */
interface WebSocket extends EventTarget {
  binaryType: BinaryType;
  readonly bufferedAmount: number;
  readonly extensions: string;
  onclose: ((this: WebSocket, ev: CloseEvent) => any) | null;
  onerror: ((this: WebSocket, ev: Event) => any) | null;
  onmessage: ((this: WebSocket, ev: MessageEvent) => any) | null;
  onopen: ((this: WebSocket, ev: Event) => any) | null;
  readonly protocol: string;
  readonly readyState: number;
  readonly url: string;
  close(code?: number, reason?: string): void;
  send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void;
  readonly CLOSED: number;
  readonly CLOSING: number;
  readonly CONNECTING: number;
  readonly OPEN: number;
  addEventListener<K extends keyof WebSocketEventMap>(
    type: K,
    listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener<K extends keyof WebSocketEventMap>(
    type: K,
    listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void;
}

declare var WebSocket: {
  prototype: WebSocket;
  new (url: string, protocols?: string | string[]): WebSocket;
  readonly CLOSED: number;
  readonly CLOSING: number;
  readonly CONNECTING: number;
  readonly OPEN: number;
};
