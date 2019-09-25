jest.mock("react-native", () => ({
  TouchableOpacity: "TouchableOpacity",
  View: "View",
}));

import View from "nars/src/View";
import TouchableOpacity from "nars/src/TouchableOpacity";
import * as NarsReconciler from "nars/src/NarsReconciler.gen";
import act from "nars/src/NarsReconcilerAct";
import * as React from "react";
import { setupReconciler } from "./TestCommons";
import { ofEncodedReactElement } from "nars-client/src/DecodeElement";

const extractKeys = (elements: (React.ReactChild | null)[]) => {
  const keySet = new Array<React.Key | null>();
  const aux = (children: (React.ReactChild | null)[]) => {
    children.forEach(element => {
      if (element && typeof element === "object") {
        keySet.push(element.key);
        aux(element.props.children);
      }
    }, elements);
  };
  aux(elements);
  return keySet;
};

describe("React Element keys", () => {
  const { container, rendered } = setupReconciler();
  it("assigns a unique key to every React element", () => {
    act(() => {
      NarsReconciler.updateContainer({
        element: (
          <View>
            <View key="abc" />
            <TouchableOpacity />
          </View>
        ),
        container: container.current,
      });
      return undefined;
    });
    expect(rendered.current).toBeTruthy();
    if (rendered.current) {
      expect(
        extractKeys(
          rendered.current.map(elem =>
            ofEncodedReactElement(() => undefined, () => undefined, elem)
          )
        )
      ).toEqual([
        "1",
        "1",
        "2",
      ]);
      act(() => {
        NarsReconciler.updateContainer({
          element: (
            <View>
              <TouchableOpacity />
              <View key="abc" />
            </View>
          ),
          container: container.current,
        });
        return undefined;
      });
      expect(
        extractKeys(
          rendered.current.map(elem =>
            ofEncodedReactElement(() => undefined, () => undefined, elem)
          )
        )
      ).toEqual([
        "1",
        "2",
        "1",
      ]);
    }
  });
});
