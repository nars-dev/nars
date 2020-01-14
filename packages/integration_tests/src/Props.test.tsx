jest.mock("react-native", () => ({
  Text: "Text",
}));
jest.mock("react-native-reanimated", () => ({
  Text: "AnimatedText",
  Image: "AnimatedImage",
  View: "AnimatedView",
}));

import * as React from "react";
import { ReactTestInstance } from "react-test-renderer";
import { Text, InputProp } from "nars";
import {
  createRemoteComponentWithDefaultSocket,
  render,
  getChildren,
} from "./TestRenderer";

const config = {
  Test: {
    text: InputProp.string,
    number: InputProp.number,
    textOptional: InputProp.optional(InputProp.string),
  },
};

const components = {
  Test: (props: { text: string; textOptional?: string }) => (
    <Text>{props.text + (props.textOptional ? props.textOptional : "")}</Text>
  ),
};

const RemoteComponent = createRemoteComponentWithDefaultSocket(
  config,
  components
);

describe("Props", () => {
  it("handles optional props", () => {
    expect(
      (getChildren(
        render(
          <RemoteComponent
            name="Test"
            props={{
              text: "A",
              number: 10,
              textOptional: undefined,
            }}
          />
        )
      )[0] as ReactTestInstance).children[0]
    ).toEqual("A");
    expect(
      (getChildren(
        render(
          <RemoteComponent
            name="Test"
            props={{
              text: "A",
              number: 20,
              textOptional: "B",
            }}
          />
        )
      )[0] as ReactTestInstance).children[0]
    ).toEqual("AB");
  });
  it("throws if a required prop is not passed", () => {
    console.error = jest.fn();
    expect(() =>
      render(
        <RemoteComponent
          name="Test"
          // @ts-ignore
          props={{
            number: 0,
            textOptional: undefined,
          }}
        />
      )
    ).toThrow("Required prop 'text' has not been passed to <Test />");
  });
});
