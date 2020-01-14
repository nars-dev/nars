jest.mock("react-native", () => ({
  FlatList: "FlatList",
  TouchableOpacity: "TouchableOpacity",
}));
jest.mock("react-native-reanimated", () => ({}));

import * as React from "react";
import { ReactTestInstance } from "react-test-renderer";
import { TouchableOpacity, FlatList, LocalProp } from "nars";
import { localProp } from "nars-common";
import {
  createRemoteComponentWithDefaultSocket,
  render,
  getChildren,
} from "./TestRenderer";

const config = {
  TouchableOpacityTest: {
    submit: localProp("optional", "TouchableOpacity", "onPress"),
  },
  FlatListTest: {
    reload: localProp("required", "FlatList", "onEndReached"),
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

const RemoteComponent = createRemoteComponentWithDefaultSocket(
  config,
  components
);

describe("RemoteComponent Local Props", () => {
  it("TouhcableOpacity has onPress set to submit", () => {
    const submit = () => null;
    const rendered = render(
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
  it("FlatList has onEndReached set to reload", () => {
    const reload = () => null;
    const rendered = render(
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
  it("throws when a required local prop is not passed in", () => {
    console.error = jest.fn();
    expect(() =>
      render(
        <RemoteComponent
          name="FlatListTest"
          // @ts-ignore
          props={{}}
        />
      )
    ).toThrow("Local Prop 'reload' has not been passed to <FlatListTest />");
  });
  it("works if an optional local prop is not passed in", () => {
    expect(
      render(
        <RemoteComponent
          name="TouchableOpacityTest"
          props={{ submit: undefined }}
        />
      ).toJSON()
    ).toMatchSnapshot();
  });
});
