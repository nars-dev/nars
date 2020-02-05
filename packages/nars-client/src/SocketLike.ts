export interface SocketLike {
  binaryType: "arraybuffer" | "blob";
  readyState: number;
  send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void;
  addEventListener<K extends keyof WebSocketEventMap>(
    type: K,
    listener: (this: SocketLike, ev: WebSocketEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener<K extends keyof WebSocketEventMap>(
    type: K,
    listener: (this: SocketLike, ev: WebSocketEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void;
}
