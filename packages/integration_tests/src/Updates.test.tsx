jest.mock("react-native", () => ({
  FlatList: "FlatList",
  TouchableOpacity: "TouchableOpacity",
}));
jest.mock("react-native-reanimated", () => ({}));

import * as React from "react";
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
    aProp: InputProp.number,
  },
};

const components = {
  TestComponent: (props: { aProp: number}) => {
    return String(props.aProp);
  },
};

const [RemoteComponent, createServer] = createRemoteComponent(
  config,
  components
);

describe("Updates", () => {
  describe("RemoteComponent", () => {
    it("should only re-render remotely on prop changes", () => {
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
              aProp: 0,
            }}
            webSocket={socket}
          />
        );
      });

      // Props not changed
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
