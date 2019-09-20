import * as NarsReconciler from "nars/src/NarsReconciler.gen";
import { Schema } from "nars-common";

export type Ref<T> = { current: T };

export const setupReconciler = () => {
  // @ts-ignore
  let container: Ref<NarsReconciler.container> = {};
  // @ts-ignore
  let rendered: Ref<Schema.ReactElement[] | undefined> = {};
  beforeEach(() => {
    container.current = NarsReconciler.createContainer({
      flushUpdates: reactElements => {
        rendered.current = reactElements;
      },
    });
  });
  return {
    container,
    rendered,
  };
};
