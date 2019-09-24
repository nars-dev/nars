import { Thenable } from "react-reconciler";
import {
  batchedUpdates,
  flushPassiveEffects,
  isThisRendererActing as IsThisRendererActing,
} from "./NarsReconciler.gen";
import enqueueTask from "./enqueueTask";

const warningWithoutStack = (condition: any, ...args: any) => {
  if (!condition) {
    console.warn(...args);
  }
};

const IsSomeRendererActing = { current: false };

// this implementation should be exactly the same in
// ReactTestUtilsAct.js, ReactTestRendererAct.js, createReactNoop.js

const isSchedulerMocked: boolean = false;
const flushWork = function() {
  let didFlushWork = false;
  while (flushPassiveEffects()) {
    didFlushWork = true;
  }

  return didFlushWork;
};

function flushWorkAndMicroTasks(onDone: (err?: Error) => void) {
  try {
    flushWork();
    enqueueTask(() => {
      if (flushWork()) {
        flushWorkAndMicroTasks(onDone);
      } else {
        onDone();
      }
    });
  } catch (err) {
    onDone(err);
  }
}

// we track the 'depth' of the act() calls with this counter,
// so we can tell if any async act() calls try to run in parallel.

let actingUpdatesScopeDepth = 0;
let didWarnAboutUsingActInProd = false;

function act(callback: () => Thenable | undefined) {
  if (!__DEV__) {
    if (didWarnAboutUsingActInProd === false) {
      didWarnAboutUsingActInProd = true;
      console.error(
        "act(...) is not supported in production builds of React, and might not behave as expected."
      );
    }
  }
  let previousActingUpdatesScopeDepth = actingUpdatesScopeDepth;
  let previousIsSomeRendererActing: boolean;
  let previousIsThisRendererActing: boolean;
  actingUpdatesScopeDepth++;

  previousIsSomeRendererActing = IsSomeRendererActing.current;
  previousIsThisRendererActing = IsThisRendererActing.current;
  IsSomeRendererActing.current = true;
  IsThisRendererActing.current = true;

  function onDone() {
    actingUpdatesScopeDepth--;
    IsSomeRendererActing.current = previousIsSomeRendererActing;
    IsThisRendererActing.current = previousIsThisRendererActing;
    if (__DEV__) {
      if (actingUpdatesScopeDepth > previousActingUpdatesScopeDepth) {
        // if it's _less than_ previousActingUpdatesScopeDepth, then we can assume the 'other' one has warned
        warningWithoutStack(
          null,
          "You seem to have overlapping act() calls, this is not supported. " +
            "Be sure to await previous act() calls before making a new one. "
        );
      }
    }
  }

  let result: Thenable | undefined;
  try {
    result = batchedUpdates(callback);
  } catch (error) {
    // on sync errors, we still want to 'cleanup' and decrement actingUpdatesScopeDepth
    onDone();
    throw error;
  }

  if (
    result !== null &&
    typeof result === "object" &&
    typeof result.then === "function"
  ) {
    // setup a boolean that gets set to true only
    // once this act() call is await-ed
    let called = false;
    if (__DEV__) {
      if (typeof Promise !== "undefined") {
        //eslint-disable-next-line no-undef
        Promise.resolve()
          .then(() => {})
          .then(() => {
            if (called === false) {
              warningWithoutStack(
                null,
                "You called act(async () => ...) without await. " +
                  "This could lead to unexpected testing behaviour, interleaving multiple act " +
                  "calls and mixing their scopes. You should - await act(async () => ...);"
              );
            }
          });
      }
    }

    const resultThen = result.then;

    // in the async case, the returned thenable runs the callback, flushes
    // effects and  microtasks in a loop until flushPassiveEffects() === false,
    // and cleans up
    return {
      then(resolve: () => void, reject: (e?: Error) => void) {
        called = true;
        resultThen(
          () => {
            if (
              actingUpdatesScopeDepth > 1 ||
              (isSchedulerMocked === true &&
                previousIsSomeRendererActing === true)
            ) {
              onDone();
              resolve();
              return;
            }
            // we're about to exit the act() scope,
            // now's the time to flush tasks/effects
            flushWorkAndMicroTasks((err?: Error) => {
              onDone();
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            });
          },
          () => {
            onDone();
            reject();
          }
        );
      },
    };
  } else {
    if (__DEV__) {
      warningWithoutStack(
        result === undefined,
        "The callback passed to act(...) function " +
          "must return undefined, or a Promise. You returned %s",
        result
      );
    }

    // flush effects until none remain, and cleanup
    try {
      if (
        actingUpdatesScopeDepth === 1 &&
        (isSchedulerMocked === false || previousIsSomeRendererActing === false)
      ) {
        // we're about to exit the act() scope,
        // now's the time to flush effects
        flushWork();
      }
      onDone();
    } catch (err) {
      onDone();
      throw err;
    }

    // in the sync case, the returned thenable only warns *if* await-ed
    return {
      then(resolve: () => void) {
        if (__DEV__) {
          warningWithoutStack(
            false,
            "Do not await the result of calling act(...) with sync logic, it is not a Promise."
          );
        }
        resolve();
      },
    };
  }
}

export default act;
