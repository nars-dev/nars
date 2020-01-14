jest.mock("react-native", () => ({
  View: "View",
  TouchableOpacity: "TouchableOpacity",
}));
jest.mock("react-native-reanimated", () => ({}));

import * as React from "react";
import { TouchableOpacity, Wait, View } from "nars";
import { act } from "react-test-renderer";
import { InputProp } from "nars-common";
import {
  createRemoteComponent,
  render,
  testSocket,
  testSocketWithMessageSpy,
} from "./TestRenderer";

const config = {
  TestComponent: {
    waiting: InputProp.boolean,
  },
  TestComponentWithNestedWait: {
    waiting: InputProp.boolean,
  },
};

const WaitingComponent = (props: { waiting: boolean }) => {
  if (props.waiting) {
    return <Wait />;
  } else {
    return <TouchableOpacity />;
  }
};

const TestComponent = (props: { waiting: boolean }) => {
  if (props.waiting) {
    return <Wait />;
  } else {
    return <TouchableOpacity />;
  }
};
const TestComponentWithNestedWait = (props: { waiting: boolean }) => {
  return (
    <View>
      <WaitingComponent waiting={props.waiting} />
    </View>
  );
};
const components = {
  TestComponent,
  TestComponentWithNestedWait,
};

const [RemoteComponent, createServer] = createRemoteComponent(
  config,
  components
);

const runTest = (name: keyof typeof components) => {
  let sendCounter = 0;
  let counter = 0;
  let socket = testSocketWithMessageSpy(
    testSocket(),
    _ev => {
      counter += 1;
    },
    _data => {
      sendCounter += 1;
    }
  );
  createServer(socket);
  const rendered = render(
    <RemoteComponent
      name={name}
      props={{
        waiting: true,
      }}
      webSocket={socket}
    />
  );

  // Initial render
  expect(sendCounter).toEqual(1);
  expect(counter).toEqual(0);

  act(() => {
    rendered.update(
      <RemoteComponent
        name={name}
        props={{
          waiting: false,
        }}
        webSocket={socket}
      />
    );
  });

  // Prop change
  expect(sendCounter).toEqual(2);
  expect(counter).toEqual(1);

  act(() => {
    rendered.update(
      <RemoteComponent
        name={name}
        props={{
          waiting: true,
        }}
        webSocket={socket}
      />
    );
  });

  // Local re-render when local props are updated
  expect(sendCounter).toEqual(3);
  expect(counter).toEqual(1);

  act(() => {
    rendered.update(
      <RemoteComponent
        name={name}
        props={{
          waiting: false,
        }}
        webSocket={socket}
      />
    );
  });
  // With a new socket it sends an unmount and render messages
  expect(sendCounter).toEqual(4);
  expect(counter).toEqual(2);
};

describe("Updates", () => {
  describe("RemoteComponent", () => {
    describe("should only send render when component wait is not in the tree", () => {
      test("Top level", () => {
        runTest("TestComponent");
      });
      test("Nested", () => {
        runTest("TestComponentWithNestedWait");
      });
    });
  });
});
