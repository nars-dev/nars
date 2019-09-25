import { ViewStyle, StyleProp } from "./StyleSheet";
import * as React from "react";
import { LocalProps } from "nars-common";
import { Schema } from "nars-common";
import * as ComponentRegistry from "./ComponentRegistry.gen";
import { encodeViewStyleInProps } from "./StyleEncoding";
import {
  encodeLocalProps,
  encodeArityZeroCallback,
  encodeInt32Value,
} from "./ProtoEncoders";

export interface Props<T> {
  style?: StyleProp<ViewStyle>;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  data: Iterable<T>;
  keyExtractor: (obj: { item: T; index: number }) => string | number;
  renderItem: (obj: { item: T; index: number }) => React.ReactElement | null;
  localProps?: LocalProps<"onEndReached">;
}

const name = "Nars_FlatList";

function filterNulls<T>(items: (T | null)[]): T[] {
  return items.filter(x => !!x) as T[];
}

export default <T>(props: Props<T>): React.ReactElement<unknown> => {
  const items = filterNulls(
    Array.from(props.data, (item, index) => {
      const renderedItemData = { item, index };
      const renderedElement = props.renderItem(renderedItemData);
      if (renderedElement) {
        const key = props.keyExtractor(renderedItemData);
        return {
          renderedElement: {
            ...renderedElement,
            key,
          },
          key,
        };
      }
      return renderedElement;
    })
  );
  const children = items.map(({ renderedElement }) => renderedElement);
  const keys = items.map(({ key }) => key);

  return React.createElement(
    name,
    {
      localProps: props.localProps,
      onEndReachedThreshold: props.onEndReachedThreshold,
      style: props.style,
      onEndReached: props.onEndReached,
      keys,
    },
    children
  );
};

ComponentRegistry.add({
  name,
  createEncoder: (key, props: ComponentRegistry.opaqueProps) => ({
    registerCallback,
    children,
  }) => {
    const keys = props.keys;
    const keyedChildren = Array.isArray(keys)
      ? keys.map((key, i) => ({
          key,
          element: children[i],
        }))
      : [];
    return Schema.ReactElement.create({
      flatList: {
        style: encodeViewStyleInProps(props),
        onEndReached: encodeArityZeroCallback(
          registerCallback,
          props.onEndReached
        ),
        onEndReachedThreshold: encodeInt32Value(props.onEndReachedThreshold),
        keyedChildren,
        localProps: encodeLocalProps(props.localProps as LocalProps<string>),
      },
      key
    });
  },
});
