jest.mock("react-native", () => ({
  FlatList: "FlatList",
  TouchableOpacity: "TouchableOpacity",
}));

import * as React from "react";
import { ReactTestInstance } from "react-test-renderer";
import { TouchableOpacity, FlatList, LocalProp } from "nars";
import { localProp } from "nars-common";
import { createRemoteComponent, render, getChildren } from "./TestRenderer";

const config = {
  TouchableOpacityTest: {
    submit: localProp("TouchableOpacity", "onPress"),
  },
  FlatListTest: {
    reload: localProp("FlatList", "onEndReached"),
  },
};

const components = {
  TouchableOpacityTest: (props: { submit: LocalProp }) => {
    return <TouchableOpacity localProps={{ onPress: props.submit }} />;
  },
  FlatListTest: (props: { reload: LocalProp }) => {
    return (
      <FlatList
        data={[]}
        keyExtractor={k => String(k)}
        renderItem={() => null}
        localProps={{ onEndReached: props.reload }}
      />
    );
  },
};

const RemoteComponent = createRemoteComponent(config, components);

describe("Components", () => {
  it("TouhcableOpacity has onPress set to submit", async () => {
    const submit = () => null;
    const rendered = await render(
      <RemoteComponent
        name="TouchableOpacityTest"
        props={{
          submit,
        }}
      />
    );

    expect((getChildren(rendered)[0] as ReactTestInstance).props.onPress).toBe(
      submit
    );
  });
  it("FlatList has onEndReached set to reload", async () => {
    const reload = () => null;
    const rendered = await render(
      <RemoteComponent
        name="FlatListTest"
        props={{
          reload,
        }}
      />
    );

    expect(
      (getChildren(rendered)[0] as ReactTestInstance).props.onEndReached
    ).toBe(reload);
  });
});
