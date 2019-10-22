"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const StructCoders_1 = require("./StructCoders");
const Schema_1 = __importDefault(require("./Schema"));
const react_native_1 = require("react-native");
function assignLocalProps(props, localProps, getLocalProp) {
    const unsafeProps = props;
    localProps.forEach(({ propKey, localKey }) => {
        if (propKey && localKey) {
            unsafeProps[propKey] = getLocalProp(localKey);
        }
    });
}
const isCallbackValid = (callback) => {
    return (callback instanceof Schema_1.default.Callback && typeof callback.callId === "number");
};
const getChildren = (rpcCall, getLocalProp, element) => {
    return element.children
        ? element.children.map(elem => exports.ofEncodedReactElement(rpcCall, getLocalProp, elem))
        : [];
};
/**
 * TODO: Reduce boilerplate
 */
exports.ofEncodedReactElement = (rpcCall, getLocalProp, element) => {
    if (element.custom) {
        return null;
    }
    else if (element.view) {
        const props = {};
        if (element.view.style) {
            props.style = StructCoders_1.ofStruct(element.view.style);
        }
        const children = getChildren(rpcCall, getLocalProp, element.view);
        props.children = children;
        return React.createElement(react_native_1.View, props, ...children);
    }
    else if (element.text) {
        const props = {};
        if (element.text.style) {
            props.style = StructCoders_1.ofStruct(element.text.style);
        }
        const children = getChildren(rpcCall, getLocalProp, element.text);
        props.children = children;
        return React.createElement(react_native_1.Text, props, ...children);
    }
    else if (element.rawText) {
        return String(element.rawText.text);
    }
    else if (element.flatList) {
        const fl = element.flatList;
        const props = {};
        if (fl.style) {
            props.style = StructCoders_1.ofStruct(fl.style);
        }
        if (fl.onEndReachedThreshold) {
            props.onEndReachedThreshold = fl.onEndReachedThreshold.value;
        }
        if (fl.localProps) {
            assignLocalProps(props, fl.localProps, getLocalProp);
        }
        if (isCallbackValid(fl.onEndReached)) {
            const callId = fl.onEndReached.callId;
            props.onEndReached = () => {
                rpcCall(callId);
            };
        }
        props.data = fl.children ? fl.children : [];
        props.renderItem = ({ item }) => {
            const rendered = exports.ofEncodedReactElement(rpcCall, getLocalProp, item);
            /* Make sure it's a react element */
            return typeof rendered === "object" ? rendered : null;
        };
        props.keyExtractor = item => {
            return String(item.key ? item.key.value : undefined);
        };
        return React.createElement(react_native_1.FlatList, Object.assign({}, props));
    }
    else if (element.touchableOpacity) {
        const to = element.touchableOpacity;
        const props = {};
        const children = getChildren(rpcCall, getLocalProp, to);
        if (to.localProps) {
            assignLocalProps(props, to.localProps, getLocalProp);
        }
        if (isCallbackValid(to.onPress)) {
            const callId = to.onPress.callId;
            props.onPress = () => {
                rpcCall(callId);
            };
        }
        return React.createElement(react_native_1.TouchableOpacity, props, ...children);
    }
    else if (element.textInput) {
        const props = {};
        const ti = element.textInput;
        if (ti.style) {
            props.style = StructCoders_1.ofStruct(ti.style);
        }
        props.value = ti.value ? ti.value : undefined;
        if (isCallbackValid(ti.onValueChange)) {
            const callId = ti.onValueChange.callId;
            props.onChangeText = value => {
                rpcCall(callId, StructCoders_1.toStruct({ value }));
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
        return React.createElement(react_native_1.TextInput, Object.assign({}, props));
    }
    else if (element.switch) {
        const props = {};
        const sw = element.switch;
        if (sw.style) {
            props.style = StructCoders_1.ofStruct(sw.style);
        }
        props.value = sw.value ? sw.value : undefined;
        if (isCallbackValid(sw.onValueChange)) {
            const callId = sw.onValueChange.callId;
            props.onValueChange = value => {
                rpcCall(callId, StructCoders_1.toStruct({ value }));
            };
        }
        return React.createElement(react_native_1.Switch, Object.assign({}, props));
    }
    else if (element.image) {
        const props = {};
        const im = element.image;
        if (im.style) {
            props.style = StructCoders_1.ofStruct(im.style);
        }
        if (im.sourceURLString) {
            props.source = { uri: im.sourceURLString };
        }
        return React.createElement(react_native_1.Image, Object.assign({}, props));
    }
    return null;
};
