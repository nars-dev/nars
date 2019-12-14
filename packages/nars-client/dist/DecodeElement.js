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
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importDefault(require("react-native-reanimated"));
const AnimatedCoders_1 = require("./AnimatedCoders");
function assignLocalProps(props, localProps, getLocalProp) {
    const unsafeProps = props;
    localProps.forEach(l => {
        unsafeProps[l.getPropkey()] = getLocalProp(l.getLocalkey());
    });
}
/**
 * TODO: Reduce boilerplate
 */
exports.ofEncodedReactElement = (rpcCall, getLocalProp, element, retainedInstances) => {
    const getChildren = (elems) => {
        return elems
            .getChildrenList()
            .map(e => exports.ofEncodedReactElement(rpcCall, getLocalProp, e, retainedInstances));
    };
    if (element.hasCustom()) {
        return null;
    }
    else if (element.hasView()) {
        const props = {};
        const view = element.getView();
        if (view.hasStyle()) {
            props.style = StructCoders_1.ofStruct(view.getStyle());
        }
        const children = getChildren(view);
        props.children = children;
        return React.createElement(react_native_1.View, props, ...children);
    }
    else if (element.hasText()) {
        const props = {};
        const text = element.getText();
        if (text.hasStyle()) {
            props.style = StructCoders_1.ofStruct(text.getStyle());
        }
        const children = getChildren(text);
        props.children = children;
        return React.createElement(react_native_1.Text, props, ...children);
    }
    else if (element.hasRawtext()) {
        return String(element.getRawtext().getText());
    }
    else if (element.hasFlatlist()) {
        const fl = element.getFlatlist();
        const props = {};
        if (fl.hasStyle()) {
            props.style = StructCoders_1.ofStruct(fl.getStyle());
        }
        if (fl.hasOnendreachedthreshold()) {
            props.onEndReachedThreshold = fl.getOnendreachedthreshold().getValue();
        }
        assignLocalProps(props, fl.getLocalpropsList(), getLocalProp);
        if (fl.hasOnendreached()) {
            const callId = fl.getOnendreached().getCallid();
            props.onEndReached = () => {
                rpcCall(callId);
            };
        }
        props.data = fl.getChildrenList();
        props.renderItem = ({ item }) => {
            const rendered = exports.ofEncodedReactElement(rpcCall, getLocalProp, item, retainedInstances);
            /* Make sure it's a react element */
            return typeof rendered === "object" ? rendered : null;
        };
        props.keyExtractor = item => {
            return String(item.hasKey() ? item.getKey().getValue() : undefined);
        };
        return React.createElement(react_native_1.FlatList, Object.assign({}, props));
    }
    else if (element.hasTouchableopacity()) {
        const to = element.getTouchableopacity();
        const props = {};
        const children = getChildren(to);
        assignLocalProps(props, to.getLocalpropsList(), getLocalProp);
        if (to.hasOnpress()) {
            const callId = to.getOnpress().getCallid();
            props.onPress = () => {
                rpcCall(callId);
            };
        }
        return React.createElement(react_native_1.TouchableOpacity, props, ...children);
    }
    else if (element.hasTextinput()) {
        const props = {};
        const ti = element.getTextinput();
        if (ti.hasStyle()) {
            props.style = StructCoders_1.ofStruct(ti.getStyle());
        }
        props.value = ti.getValue();
        if (ti.hasOnvaluechange()) {
            const callId = ti.getOnvaluechange().getCallid();
            props.onChangeText = value => {
                rpcCall(callId, StructCoders_1.toStruct({ value }));
            };
        }
        assignLocalProps(props, ti.getLocalpropsList(), getLocalProp);
        if (ti.hasPlaceholdertextcolor()) {
            props.placeholderTextColor = ti.getPlaceholdertextcolor().getValue();
        }
        if (ti.hasPlaceholder()) {
            props.placeholder = ti.getPlaceholder().getValue();
        }
        return React.createElement(react_native_1.TextInput, Object.assign({}, props));
    }
    else if (element.hasSwitch()) {
        const props = {};
        const sw = element.getSwitch();
        if (sw.hasStyle()) {
            props.style = StructCoders_1.ofStruct(sw.getStyle());
        }
        props.value = sw.getValue();
        if (sw.hasOnvaluechange()) {
            const callId = sw.getOnvaluechange().getCallid();
            props.onValueChange = value => {
                rpcCall(callId, StructCoders_1.toStruct({ value }));
            };
        }
        return React.createElement(react_native_1.Switch, Object.assign({}, props));
    }
    else if (element.hasImage()) {
        const props = {};
        const im = element.getImage();
        if (im.hasStyle()) {
            props.style = StructCoders_1.ofStruct(im.getStyle());
        }
        if (im.getSourceurlstring()) {
            props.source = { uri: im.getSourceurlstring() };
        }
        return React.createElement(react_native_1.Image, Object.assign({}, props));
    }
    else if (element.hasAnimatedview()) {
        const props = {};
        const av = element.getAnimatedview();
        if (av.hasStyle()) {
            props.style = AnimatedCoders_1.decodeAnimatedStyle(av.getStyle(), retainedInstances);
            console.log(props.style);
        }
        const children = getChildren(av);
        props.children = children;
        return React.createElement(react_native_reanimated_1.default.View, props, ...children);
    }
    else if (element.hasAnimatedtext()) {
        const props = {};
        const at = element.getAnimatedtext();
        if (at.hasStyle()) {
            props.style = AnimatedCoders_1.decodeAnimatedStyle(at.getStyle(), retainedInstances);
        }
        const children = getChildren(at);
        props.children = children;
        return React.createElement(react_native_reanimated_1.default.Text, props, ...children);
    }
    else if (element.hasAnimatedimage()) {
        const props = {};
        const im = element.getAnimatedimage();
        if (im.hasStyle()) {
            props.style = AnimatedCoders_1.decodeAnimatedStyle(im.getStyle(), retainedInstances);
        }
        if (im.getSourceurlstring()) {
            props.source = { uri: im.getSourceurlstring() };
        }
        return React.createElement(react_native_reanimated_1.default.Image, Object.assign({}, props));
    }
    return null;
};
