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
  TestComponentWithSuspense: {
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

const SuspenseWaitingComponent = (props: { waiting: boolean }) => {
  const resolver = React.useRef<(() => void) | undefined>(undefined);
  React.useEffect(() => {
    if (!props.waiting && resolver.current) {
      resolver.current();
      resolver.current = undefined;
    }
  }, [props.waiting]);

  if (!resolver.current && props.waiting) {
    throw new Promise(resolve => {
      resolver.current = resolve;
    });
  }
  return <TouchableOpacity />;
};

const TestComponentWithSuspense = (props: { waiting: boolean }) => {
  return (
    <React.Suspense fallback={<Wait />}>
      <SuspenseWaitingComponent waiting={props.waiting} />
    </React.Suspense>
  );
};

const components = {
  TestComponent,
  TestComponentWithNestedWait,
  TestComponentWithSuspense,
};

const [RemoteComponent, createServer] = createRemoteComponent(
  config,
  components
);

const runTest = (name: keyof typeof components) => {
  const TEST = RemoteComponent[name];
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
  const rendered = render(<TEST waiting={true} webSocket={socket} />);

  // Initial render
  expect(sendCounter).toEqual(1);
  expect(counter).toEqual(0);

  act(() => {
    rendered.update(<TEST waiting={false} webSocket={socket} />);
  });

  // Prop change
  expect(sendCounter).toEqual(2);
  expect(counter).toEqual(1);

  act(() => {
    rendered.update(<TEST waiting={true} webSocket={socket} />);
  });

  // Local re-render when local props are updated
  expect(sendCounter).toEqual(3);
  expect(counter).toEqual(1);

  act(() => {
    rendered.update(<TEST waiting={false} webSocket={socket} />);
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
      test("Suspense", () => {
        runTest("TestComponentWithSuspense");
      });
    });
  });
});
