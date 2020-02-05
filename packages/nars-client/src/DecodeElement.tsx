import * as React from "react";
import { ofStruct } from "./StructCoders";
import * as Schema from "./schema_pb";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Switch,
  Image,
} from "react-native";
import Animated from "react-native-reanimated";
import { decodeAnimatedStyle, RetainedInstances } from "./AnimatedCoders";

type Writable<T> = {
  -readonly [K in keyof T]: T[K];
};

function assignLocalProps<T extends object>(
  props: T,
  localProps: Array<Schema.LocalProp>,
  getLocalProp: (key: string) => unknown
) {
  const unsafeProps = props as { [k: string]: any };
  localProps.forEach(l => {
    unsafeProps[l.getPropkey()] = getLocalProp(l.getLocalkey());
  });
}

const decodeCallback = (
  encoded: Schema.Callback,
  getLocalProp: (key: string) => unknown,
  rpcCall: (callId: number, args?: { [k: string]: unknown }) => void
): (<LocalArgs>(local: LocalArgs) => void) | undefined => {
  if (encoded.hasRemote()) {
    const callId = encoded.getRemote();
    return args => {
      rpcCall(callId, { value: args });
    };
  } else if (encoded.hasLocal()) {
    const local = encoded.getLocal()!;
    const args = ofStruct(local.getArgs());
    const callback = getLocalProp(local.getLocalkey());
    if (typeof callback === "function") {
      return localArgs => {
        callback(localArgs, args);
      };
    }
  }
  return undefined;
};

/**
 * TODO: Reduce boilerplate
 */
export const ofEncodedReactElement = (
  rpcCall: (callId: number, args?: { [k: string]: unknown }) => void,
  getLocalProp: (key: string) => unknown,
  element: Schema.ReactElement,
  retainedInstances: RetainedInstances
): React.ReactChild | null => {
  const getChildren = (elems: { getChildrenList(): Schema.ReactElement[] }) => {
    return elems
      .getChildrenList()
      .map(e =>
        ofEncodedReactElement(rpcCall, getLocalProp, e, retainedInstances)
      );
  };
  if (element.hasCustom()) {
    return null;
  } else if (element.hasView()) {
    const props = {} as Writable<View["props"]>;
    const view = element.getView()!;
    if (view.hasStyle()) {
      props.style = ofStruct(view.getStyle()!);
    }
    const children = getChildren(view);
    props.children = children;
    return React.createElement(View, props, ...children);
  } else if (element.hasText()) {
    const props = {} as Writable<Text["props"]>;
    const text = element.getText()!;
    if (text.hasStyle()) {
      props.style = ofStruct(text.getStyle()!);
    }
    if (text.hasNumberoflines()) {
      props.numberOfLines = text.getNumberoflines()!.getValue();
    }
    const children = getChildren(text);
    props.children = children;
    return React.createElement(Text, props, ...children);
  } else if (element.hasRawtext()) {
    return String(element.getRawtext()!.getText());
  } else if (element.hasFlatlist()) {
    const fl = element.getFlatlist()!;
    const props = {} as Writable<FlatList<Schema.ReactElement>["props"]>;
    if (fl.hasStyle()) {
      props.style = ofStruct(fl.getStyle()!);
    }
    if (fl.hasOnendreachedthreshold()) {
      props.onEndReachedThreshold = fl.getOnendreachedthreshold()!.getValue();
    }
    assignLocalProps(props, fl.getLocalpropsList(), getLocalProp);
    if (fl.hasOnendreached()) {
      const decoded = decodeCallback(
        fl.getOnendreached()!,
        getLocalProp,
        rpcCall
      );
      if (decoded) {
        props.onEndReached = decoded;
      }
    }
    props.data = fl.getChildrenList();
    props.renderItem = ({ item }) => {
      const rendered = ofEncodedReactElement(
        rpcCall,
        getLocalProp,
        item,
        retainedInstances
      );
      /* Make sure it's a react element */
      return typeof rendered === "object" ? rendered : null;
    };
    props.keyExtractor = item => {
      return String(item.hasKey() ? item.getKey()!.getValue() : undefined);
    };
    return <FlatList {...props} />;
  } else if (element.hasTouchableopacity()) {
    const to = element.getTouchableopacity()!;
    const props = {} as Writable<TouchableOpacity["props"]>;
    const children = getChildren(to);
    assignLocalProps(props, to.getLocalpropsList(), getLocalProp);
    if (to.hasOnpress()) {
      const decoded = decodeCallback(to.getOnpress()!, getLocalProp, rpcCall);
      if (decoded) {
        props.onPress = decoded;
      }
    }
    return React.createElement(TouchableOpacity, props, ...children);
  } else if (element.hasTextinput()) {
    const props = {} as Writable<TextInput["props"]>;
    const ti = element.getTextinput()!;
    if (ti.hasStyle()) {
      props.style = ofStruct(ti.getStyle());
    }
    props.value = ti.getValue();
    if (ti.hasOnvaluechange()) {
      const decoded = decodeCallback(
        ti.getOnvaluechange()!,
        getLocalProp,
        rpcCall
      );
      if (decoded) {
        props.onChangeText = decoded;
      }
    }
    assignLocalProps(props, ti.getLocalpropsList(), getLocalProp);
    if (ti.hasPlaceholdertextcolor()) {
      props.placeholderTextColor = ti.getPlaceholdertextcolor()!.getValue();
    }
    if (ti.hasPlaceholder()) {
      props.placeholder = ti.getPlaceholder()!.getValue();
    }
    return <TextInput {...props} />;
  } else if (element.hasSwitch()) {
    const props = {} as Writable<Switch["props"]>;
    const sw = element.getSwitch()!;
    if (sw.hasStyle()) {
      props.style = ofStruct(sw.getStyle());
    }
    props.value = sw.getValue();
    if (sw.hasOnvaluechange()) {
      const decoded = decodeCallback(
        sw.getOnvaluechange()!,
        getLocalProp,
        rpcCall
      );
      if (decoded) {
        props.onValueChange = decoded;
      }
    }
    return <Switch {...props} />;
  } else if (element.hasImage()) {
    const props = {} as Writable<Image["props"]>;
    const im = element.getImage()!;
    if (im.hasStyle()) {
      props.style = ofStruct(im.getStyle());
    }
    if (im.getSourceurlstring()) {
      props.source = { uri: im.getSourceurlstring() };
    }
    return <Image {...props} />;
  } else if (element.hasAnimatedview()) {
    const props = {} as Writable<Animated.View["props"]>;
    const av = element.getAnimatedview()!;
    if (av.hasStyle()) {
      props.style = decodeAnimatedStyle(av.getStyle(), retainedInstances);
    }
    const children = getChildren(av);
    props.children = children;
    return React.createElement(Animated.View, props, ...children);
  } else if (element.hasAnimatedtext()) {
    const props = {} as Writable<Animated.Text["props"]>;
    const at = element.getAnimatedtext()!;
    if (at.hasStyle()) {
      props.style = decodeAnimatedStyle(at.getStyle(), retainedInstances);
    }
    const children = getChildren(at);
    props.children = children;
    return React.createElement(Animated.Text, props, ...children);
  } else if (element.hasAnimatedimage()) {
    const props = {} as Writable<Animated.Image["props"]>;
    const im = element.getAnimatedimage()!;
    if (im.hasStyle()) {
      props.style = decodeAnimatedStyle(im.getStyle(), retainedInstances);
    }
    if (im.getSourceurlstring()) {
      props.source = { uri: im.getSourceurlstring() };
    }
    return <Animated.Image {...props} />;
  }
  return null;
};
