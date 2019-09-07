"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const nars_common_1 = require("nars-common");
const react_native_1 = require("react-native");
function assignLocalProps(props, localProps, getLocalProp) {
    const unsafeProps = props;
    localProps.forEach(({ propKey, localKey }) => {
        if (propKey && localKey) {
            unsafeProps[propKey] = getLocalProp(localKey);
        }
    });
}
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
            props.style = nars_common_1.ofStruct(element.view.style);
        }
        if (element.view.children) {
            props.children = element.view.children.map(elem => exports.ofEncodedReactElement(rpcCall, getLocalProp, elem));
        }
        return React.createElement(react_native_1.View, Object.assign({}, props));
    }
    else if (element.text) {
        const props = {};
        if (element.text.style) {
            props.style = nars_common_1.ofStruct(element.text.style);
        }
        if (element.text.children) {
            props.children = element.text.children.map(elem => exports.ofEncodedReactElement(rpcCall, getLocalProp, elem));
        }
        return React.createElement(react_native_1.Text, Object.assign({}, props));
    }
    else if (element.rawText) {
        return String(element.rawText.text);
    }
    else if (element.flatList) {
        const fl = element.flatList;
        const props = {};
        if (fl.style) {
            props.style = nars_common_1.ofStruct(fl.style);
        }
        if (fl.onEndReachedThreshold) {
            props.onEndReachedThreshold = fl.onEndReachedThreshold.value;
        }
        if (fl.localProps) {
            assignLocalProps(props, fl.localProps, getLocalProp);
        }
        if (fl.onEndReached && typeof fl.onEndReached.callId === "number") {
            const callId = fl.onEndReached.callId;
            props.onEndReached = () => {
                rpcCall(callId);
            };
        }
        props.data = fl.keyedChildren ? fl.keyedChildren : [];
        props.renderItem = ({ item }) => {
            if (item.element) {
                const rendered = exports.ofEncodedReactElement(rpcCall, getLocalProp, item.element);
                /* Make sure it's a react element */
                return typeof rendered === "object" ? rendered : null;
            }
            return null;
        };
        props.keyExtractor = item => {
            return String(item.key);
        };
        return React.createElement(react_native_1.FlatList, Object.assign({}, props));
    }
    else if (element.touchableOpacity) {
        const to = element.touchableOpacity;
        const props = {};
        if (to.children) {
            props.children = to.children.map(elem => exports.ofEncodedReactElement(rpcCall, getLocalProp, elem));
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
        return React.createElement(react_native_1.TouchableOpacity, Object.assign({}, props));
    }
    else if (element.textInput) {
        const props = {};
        const ti = element.textInput;
        if (ti.style) {
            props.style = nars_common_1.ofStruct(ti.style);
        }
        props.value = ti.value ? ti.value : undefined;
        if (ti.onValueChange && ti.onValueChange.callId) {
            const callId = ti.onValueChange.callId;
            props.onChangeText = value => {
                rpcCall(callId, nars_common_1.toStruct({ value }));
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
            props.style = nars_common_1.ofStruct(sw.style);
        }
        props.value = sw.value ? sw.value : undefined;
        if (sw.onValueChange && typeof sw.onValueChange.callId === "number") {
            const callId = sw.onValueChange.callId;
            props.onValueChange = value => {
                rpcCall(callId, nars_common_1.toStruct({ value }));
            };
        }
        return React.createElement(react_native_1.Switch, Object.assign({}, props));
    }
    else if (element.image) {
        const props = {};
        const im = element.image;
        if (im.style) {
            props.style = nars_common_1.ofStruct(im.style);
        }
        if (im.sourceURLString) {
            props.source = { uri: im.sourceURLString };
        }
        return React.createElement(react_native_1.Image, Object.assign({}, props));
    }
    return null;
};
