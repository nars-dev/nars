import { ViewStyle, StyleProp } from "./StyleSheet";
import * as React from "react";
import { t as LocalProp } from "./LocalProp.gen";
import { name, props } from "./FlatList.gen";

export interface Props<T> {
  style?: StyleProp<ViewStyle>;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  data: Iterable<T>;
  keyExtractor: (obj: { item: T; index: number }) => string | number;
  renderItem: (obj: { item: T; index: number }) => React.ReactElement | null;
  localProps?: {
    onEndReached?: LocalProp;
  };
}

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
  const keys = items.map(({ key }) => key.toString());

  const reactProps: props = {
    localProps: props.localProps,
    onEndReachedThreshold: props.onEndReachedThreshold,
    style: props.style,
    onEndReached: props.onEndReached,
    keys,
  };
  return React.createElement(name, reactProps, children);
};
