jest.mock("react-native", () => ({
  TouchableOpacity: "TouchableOpacity",
}));
jest.mock("react-native-reanimated", () => ({}));

import * as React from "react";
import { TouchableOpacity, rpc } from "nars";
import { ReactTestInstance, act } from "react-test-renderer";
import { InputProp } from "nars-common";
import {
  createRemoteComponent,
  render,
  getChildren,
  testSocket,
  testSocketWithMessageSpy,
  TestSocketLike,
} from "./TestRenderer";

const config = {
  TestComponentSimpleCallback: {
    runsOnClient: InputProp.function(InputProp.void),
  },
  TestComponentCallbackWithValues: {
    runsOnClient: InputProp.function(
      InputProp.object({
        a: InputProp.number,
        b: InputProp.number,
      })
    ),
  },
  TestComponentCallbackWithReturnCallback: {
    runsOnClient: InputProp.function(
      InputProp.object({
        a: InputProp.number,
        runsOnServer: InputProp.function(
          InputProp.object({
            b: InputProp.number,
          })
        ),
      })
    ),
  },
};

const components = {
  TestComponentSimpleCallback: (props: { runsOnClient: (_: void) => void }) => {
    return (
      <TouchableOpacity
        onPress={rpc(() => {
          props.runsOnClient();
        })}
      />
    );
  },
  TestComponentCallbackWithValues: (props: {
    runsOnClient: (_: { a: number; b: number }) => void;
  }) => {
    return (
      <TouchableOpacity
        onPress={rpc(() => {
          props.runsOnClient({ a: 1, b: 2 });
        })}
      />
    );
  },
  TestComponentCallbackWithReturnCallback: (props: {
    runsOnClient: (_: {
      a: number;
      runsOnServer: (_: { b: number }) => void;
    }) => void;
  }) => {
    const [state, setState] = React.useState(5);
    return (
      <>
        <TouchableOpacity
          onPress={rpc(() => {
            props.runsOnClient({
              a: 5,
              runsOnServer: (x: { b: number }) => {
                setState(x.b);
              },
            });
          })}
        />
        {String(state)}
      </>
    );
  },
};

const [
  {
    TestComponentSimpleCallback,
    TestComponentCallbackWithReturnCallback,
    TestComponentCallbackWithValues,
  },
  createServer,
] = createRemoteComponent(config, components);

describe("Callback", () => {
  let sendCounter = 0;
  let counter = 0;
  let socket: TestSocketLike;
  beforeEach(() => {
    sendCounter = 0;
    counter = 0;
    socket = testSocketWithMessageSpy(
      testSocket(),
      _ev => {
        counter += 1;
      },
      _data => {
        sendCounter += 1;
      }
    );
    createServer(socket);
  });
  test("No parameters", () => {
    let called = false;
    const rendered = render(
      <TestComponentSimpleCallback
        webSocket={socket}
        runsOnClient={() => {
          called = true;
        }}
      />
    );
    act(() => {
      (getChildren(rendered)[0] as ReactTestInstance).props.onPress();
    });
    expect(called).toBe(true);
    // Prop change
    expect(sendCounter).toEqual(2);
    expect(counter).toEqual(2);
  });
  test("With two parameters", () => {
    let result: number[] = [];
    const rendered = render(
      <TestComponentCallbackWithValues
        webSocket={socket}
        runsOnClient={({ a, b }: { a: number; b: number }) => {
          result = [a, b];
        }}
      />
    );
    act(() => {
      (getChildren(rendered)[0] as ReactTestInstance).props.onPress();
    });
    expect(result).toEqual([1, 2]);
    // Prop change
    expect(sendCounter).toEqual(2);
    expect(counter).toEqual(2);
  });
  test("With a return callback", () => {
    let result: number[] = [];
    const rendered = render(
      <TestComponentCallbackWithReturnCallback
        webSocket={socket}
        runsOnClient={({
          a,
          runsOnServer,
        }: {
          a: number;
          runsOnServer: (_: { b: number }) => void;
        }) => {
          result = [a];
          runsOnServer({ b: 100 });
        }}
      />
    );
    expect(sendCounter).toEqual(1);
    expect(counter).toEqual(1);
    act(() => {
      (getChildren(rendered)[0] as ReactTestInstance).props.onPress();
    });
    expect(result).toEqual([5]);
    expect(getChildren(rendered)[1] as ReactTestInstance).toEqual("100");
    // Prop change
    expect(sendCounter).toEqual(3);
    expect(counter).toEqual(3);
  });
});
