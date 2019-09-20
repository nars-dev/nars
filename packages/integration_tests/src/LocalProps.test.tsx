jest.mock("react-native", () => ({
  FlatList: "FlatList",
  TouchableOpacity: "TouchableOpacity",
}));

import FlatList from "nars/src/FlatList";
import TouchableOpacity from "nars/src/TouchableOpacity";
import * as NarsReconciler from "nars/src/NarsReconciler.gen";
import act from "nars/src/NarsReconcilerAct";
import * as React from "react";
import { setupReconciler, Ref } from "./TestCommons";
import { ofEncodedReactElement } from "nars-client/src/DecodeElement";
import { Schema } from "nars-common";

const expectLocalProp = ({
  localProps,
  container,
  rendered,
  element,
  doExpectation,
}: {
  localProps: { [k: string]: unknown };
  container: Ref<NarsReconciler.container>;
  rendered: Ref<Schema.ReactElement[] | undefined>;
  element: React.ReactElement;
  doExpectation: (props: { [k: string]: unknown }) => void;
}) => {
  act(() => {
    NarsReconciler.updateContainer({
      element,
      container: container.current,
    });
    return undefined;
  });
  expect(rendered.current).toBeTruthy();
  if (rendered.current) {
    const decoded = ofEncodedReactElement(
      () => undefined,
      (key: string) => {
        return localProps[key];
      },
      rendered.current[0]
    );
    expect(decoded).toBeTruthy();
    expect(typeof decoded).toEqual("object");
    if (decoded && typeof decoded === "object") {
      doExpectation(decoded.props);
    }
  }
};

describe("LocalProps", () => {
  const { container, rendered } = setupReconciler();
  it("encodes FlatList", () => {
    const onEnd = () => null;
    expectLocalProp({
      localProps: {
        onEnd,
      },
      container,
      rendered,
      element: (
        <FlatList
          data={[]}
          keyExtractor={() => ""}
          renderItem={() => null}
          localProps={{ onEndReached: { key: "onEnd" } }}
        />
      ),
      doExpectation: props => expect(props.onEndReached).toBe(onEnd),
    });
  });
  it("encodes TouchableOpacity", () => {
    const submit = () => null;
    expectLocalProp({
      localProps: {
        submit,
      },
      container,
      rendered,
      element: (
        <TouchableOpacity
          localProps={{ onPress: { key: "submit" } }}
        />
      ),
      doExpectation: props => expect(props.onPress).toBe(submit),
    });
  });
});
