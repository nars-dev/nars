jest.mock("react-native", () => ({
  FlatList: "FlatList",
  TouchableOpacity: "TouchableOpacity",
}));

import * as React from "react";
import { ReactTestInstance, ReactTestRenderer } from "react-test-renderer";
import { TouchableOpacity, FlatList, LocalProp } from "nars";
import { localProp } from "nars-common";
import { createRemoteComponent, render } from "./TestRenderer";

export const config = {
  TouchableOpacityTest: {
    props: { },
    localProps: {
      submit: localProp("TouchableOpacity", "onPress"),
    },
  },
  FlatListTest: {
    props: {},
    localProps: {
      reload: localProp("FlatList", "onEndReached"),
    },
  },
};

const components = {
  TouchableOpacityTest: (props: {
    props: { };
    localProps: { submit: LocalProp };
  }) => {
    return (
      <TouchableOpacity localProps={{ onPress: props.localProps.submit }} />
    );
  },
  FlatListTest: (props: { props: {}; localProps: { reload: LocalProp } }) => {
    return (
      <FlatList
        data={[]}
        keyExtractor={k => String(k)}
        renderItem={() => <TouchableOpacity />}
        localProps={{ onEndReached: props.localProps.reload }}
      />
    );
  },
};

const RemoteComponent = createRemoteComponent(config, components);

const getChildren = (rendered: ReactTestRenderer) => {
  return (rendered.root.children[0] as ReactTestInstance).children;
};

describe("Components", () => {
  it("TouhcableOpacity has onPress set to submit", async () => {
    const submit = () => null;
    const rendered = await render(
      <RemoteComponent
        name="TouchableOpacityTest"
        props={{
          props: { backgroundColor: "aa" },
          localProps: { submit },
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
          props: {},
          localProps: { reload },
        }}
      />
    );

    expect(
      (getChildren(rendered)[0] as ReactTestInstance).props.onEndReached
    ).toBe(reload);
  });
});
