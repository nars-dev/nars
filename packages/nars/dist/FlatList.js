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
const ComponentRegistry = __importStar(require("./ComponentRegistry.gen"));
const StyleEncoding_1 = require("./StyleEncoding");
const ProtoEncoders_1 = require("./ProtoEncoders");
const name = "Nars_FlatList";
function filterNulls(items) {
    return items.filter(x => !!x);
}
exports.default = (props) => {
    const items = filterNulls(Array.from(props.data, (item, index) => {
        const renderedItemData = { item, index };
        const renderedElement = props.renderItem(renderedItemData);
        if (renderedElement) {
            const key = props.keyExtractor(renderedItemData);
            return {
                renderedElement: Object.assign(Object.assign({}, renderedElement), { key }),
                key
            };
        }
        return renderedElement;
    }));
    const children = items.map(({ renderedElement }) => renderedElement);
    const keys = items.map(({ key }) => key);
    return React.createElement(name, {
        localProps: props.localProps,
        onEndReachedThreshold: props.onEndReachedThreshold,
        style: props.style,
        onEndReached: props.onEndReached,
        keys
    }, children);
};
ComponentRegistry.add({
    name,
    createEncoder: (props) => ({ registerCallback, children }) => {
        const keys = props.keys;
        const keyedChildren = Array.isArray(keys)
            ? keys.map((key, i) => ({
                key,
                element: children[i]
            }))
            : [];
        const onEndReached = props.onEndReached;
        return nars_common_1.Schema.ReactElement.create({
            flatList: {
                style: StyleEncoding_1.encodeViewStyleInProps(props),
                onEndReached: ProtoEncoders_1.encodeArityZeroCallback(registerCallback, onEndReached),
                onEndReachedThreshold: ProtoEncoders_1.encodeInt32Value(props.onEndReachedThreshold),
                keyedChildren,
                localProps: ProtoEncoders_1.encodeLocalProps(props.localProps)
            }
        });
    }
});
