jest.mock("react-native", () => ({
  Text: "Text",
}));

import * as React from "react";
import { ReactTestInstance } from "react-test-renderer";
import { Text, InputProp } from "nars";
import { createRemoteComponent, render, getChildren } from "./TestRenderer";

const config = {
  Test: {
    text: InputProp.string,
    textOptional: InputProp.optional(InputProp.string),
  },
};

const components = {
  Test: (props: { text: string; textOptional?: string }) => (
    <Text>{props.text + (props.textOptional ? props.textOptional : "")}</Text>
  ),
};

const RemoteComponent = createRemoteComponent(config, components);

describe("Props", () => {
  it("passes only the required prop", async () => {
    const rendered = await render(
      <RemoteComponent
        name="Test"
        props={{
          text: "A",
          textOptional: undefined,
        }}
      />
    );

    expect((getChildren(rendered)[0] as ReactTestInstance).children[0]).toBe(
      "A"
    );
  });
});
