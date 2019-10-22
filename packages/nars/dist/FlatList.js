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
const FlatList_gen_1 = require("./FlatList.gen");
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
                key,
            };
        }
        return renderedElement;
    }));
    const children = items.map(({ renderedElement }) => renderedElement);
    const keys = items.map(({ key }) => key.toString());
    const reactProps = {
        localProps: props.localProps,
        onEndReachedThreshold: props.onEndReachedThreshold,
        style: props.style,
        onEndReached: props.onEndReached,
        keys,
    };
    return React.createElement(FlatList_gen_1.name, reactProps, children);
};
