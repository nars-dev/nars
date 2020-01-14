jest.mock("react-native", () => ({
  FlatList: "FlatList",
  TouchableOpacity: "TouchableOpacity",
}));
jest.mock("react-native-reanimated", () => ({}));

import * as React from "react";
import { TouchableOpacity, LocalProp } from "nars";
import { act } from "react-test-renderer";
import { localProp, InputProp } from "nars-common";
import {
  createRemoteComponent,
  render,
  testSocket,
  testSocketWithMessageSpy,
} from "./TestRenderer";

const config = {
  TestComponent: {
    submit: localProp("optional", "TouchableOpacity", "onPress"),
    aProp: InputProp.number,
  },
};

const components = {
  TestComponent: (props: { submit: LocalProp }) => {
    return <TouchableOpacity localProps={{ onPress: props.submit }} />;
  },
};

const [RemoteComponent, createServer] = createRemoteComponent(
  config,
  components
);

describe("Updates", () => {
  describe("RemoteComponent", () => {
    it("should only re-render remotely on prop changes", () => {
      const submit = () => null;
      const submit2 = () => null;
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
          name="TestComponent"
          props={{
            submit,
            aProp: 1,
          }}
          webSocket={socket}
        />
      );

      // Initial render
      expect(sendCounter).toEqual(1);
      expect(counter).toEqual(1);

      act(() => {
        rendered.update(
          <RemoteComponent
            name="TestComponent"
            props={{
              submit,
              aProp: 0,
            }}
            webSocket={socket}
          />
        );
      });

      // Prop change
      expect(sendCounter).toEqual(2);
      expect(counter).toEqual(2);

      act(() => {
        rendered.update(
          <RemoteComponent
            name="TestComponent"
            props={{
              submit: submit2,
              aProp: 0,
            }}
            webSocket={socket}
          />
        );
      });

      // Local re-render when local props are updated
      expect(sendCounter).toEqual(2);
      expect(counter).toEqual(2);

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

      act(() => {
        rendered.update(
          <RemoteComponent
            name="TestComponent"
            props={{
              submit: submit2,
              aProp: 0,
            }}
            webSocket={socket}
          />
        );
      });
      // With a new socket it sends an unmount and render messages
      expect(sendCounter).toEqual(4);
      expect(counter).toEqual(3);
    });
  });
});
