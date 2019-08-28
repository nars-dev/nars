import * as React from "react";
import { ofStruct, toStruct, Schema } from "nars-common";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Switch,
  Image
} from "react-native";

type Writable<T> = {
  -readonly [K in keyof T]: T[K];
};

function assignLocalProps<T extends object>(
  props: T,
  localProps: Array<Schema.ILocalProp>,
  getLocalProp: (key: string) => unknown
) {
  const unsafeProps = props as { [k: string]: any };
  localProps.forEach(({ propKey, localKey }) => {
    if (propKey && localKey) {
      unsafeProps[propKey] = getLocalProp(localKey);
    }
  });
}

/**
 * TODO: Reduce boilerplate
 */
export const ofEncodedReactElement = (
  rpcCall: (callId: number, args?: Schema.google.protobuf.IStruct) => void,
  getLocalProp: (key: string) => unknown,
  element: Schema.IReactElement
): React.ReactChild | null => {
  if (element.custom) {
    return null;
  } else if (element.view) {
    const props = {} as Writable<View["props"]>;
    if (element.view.style) {
      props.style = ofStruct(element.view.style);
    }
    if (element.view.children) {
      props.children = element.view.children.map(elem =>
        ofEncodedReactElement(rpcCall, getLocalProp, elem)
      );
    }
    return <View {...props} />;
  } else if (element.text) {
    const props = {} as Writable<Text["props"]>;
    if (element.text.style) {
      props.style = ofStruct(element.text.style);
    }
    if (element.text.children) {
      props.children = element.text.children.map(elem =>
        ofEncodedReactElement(rpcCall, getLocalProp, elem)
      );
    }
    return <Text {...props} />;
  } else if (element.rawText) {
    return String(element.rawText.text);
  } else if (element.flatList) {
    const fl = element.flatList;
    const props = {} as Writable<FlatList<Schema.IKeyedChild>["props"]>;
    if (fl.style) {
      props.style = ofStruct(fl.style);
    }
    if (fl.onEndReachedThreshold) {
      props.onEndReachedThreshold = fl.onEndReachedThreshold.value;
    }
    if (fl.localProps) {
      assignLocalProps(props, fl.localProps, getLocalProp);
    }
    if (fl.onEndReached && fl.onEndReached.callId) {
      const callId = fl.onEndReached.callId;
      props.onEndReached = () => {
        rpcCall(callId);
      };
    }
    props.data = fl.keyedChildren ? fl.keyedChildren : [];
    props.renderItem = ({ item }) => {
      if (item.element) {
        const rendered = ofEncodedReactElement(
          rpcCall,
          getLocalProp,
          item.element
        );
        /* Make sure it's a react element */
        return typeof rendered === "object" ? rendered : null;
      }
      return null;
    };
    props.keyExtractor = item => {
      return String(item.key);
    };
    return <FlatList {...props} />;
  } else if (element.touchableOpacity) {
    const to = element.touchableOpacity;
    const props = {} as Writable<TouchableOpacity["props"]>;
    if (to.children) {
      props.children = to.children.map(elem =>
        ofEncodedReactElement(rpcCall, getLocalProp, elem)
      );
    }
    if (to.localProps) {
      assignLocalProps(props, to.localProps, getLocalProp);
    }
    if (to.onPress && to.onPress.callId) {
      const callId = to.onPress.callId;
      props.onPress = () => {
        rpcCall(callId);
      };
    }
    return <TouchableOpacity {...props} />;
  } else if (element.textInput) {
    const props = {} as Writable<TextInput["props"]>;
    const ti = element.textInput;
    if (ti.style) {
      props.style = ofStruct(ti.style);
    }
    props.value = ti.value ? ti.value : undefined;
    if (ti.onValueChange && ti.onValueChange.callId) {
      const callId = ti.onValueChange.callId;
      props.onChangeText = value => {
        rpcCall(callId, toStruct({ value }));
      };
    }
    if (ti.localProps) {
      assignLocalProps(props, ti.localProps, getLocalProp);
    }
    if (ti.placeholderTextColor && ti.placeholderTextColor.value) {
      props.placeholderTextColor = ti.placeholderTextColor.value;
    }
    if (ti.placeholder && ti.placeholder.value) {
      props.placeholder = ti.placeholder.value;
    }
    return <TextInput {...props} />;
  } else if (element.switch) {
    const props = {} as Writable<Switch["props"]>;
    const sw = element.switch;
    if (sw.style) {
      props.style = ofStruct(sw.style);
    }
    props.value = sw.value ? sw.value : undefined;
    if (sw.onValueChange && typeof sw.onValueChange.callId === "number") {
      const callId = sw.onValueChange.callId;
      props.onValueChange = value => {
        rpcCall(callId, toStruct({ value }));
      };
    }
    return <Switch {...props} />;
  } else if (element.image) {
    const props = {} as Writable<Image["props"]>;
    const im = element.image;
    if (im.style) {
      props.style = ofStruct(im.style);
    }
    if (im.sourceURLString) {
      props.source = { uri: im.sourceURLString };
    }
    return <Image {...props} />;
  }
  return null;
};
