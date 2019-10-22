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
const nars_1 = require("nars");
const Loading = () => (React.createElement(nars_1.View, { style: styles.elementContainer },
    React.createElement(nars_1.View, { style: styles.contentContainer },
        React.createElement(nars_1.View, { style: styles.fakeImage }),
        React.createElement(nars_1.View, { style: styles.textPlaceholdersContainer },
            React.createElement(nars_1.View, { style: styles.titlePlaceholder }),
            React.createElement(nars_1.View, { style: styles.subtitlePlaceholder })))));
const styles = nars_1.StyleSheet.create({
    contentContainer: {
        flexDirection: "row",
    },
    elementContainer: {
        paddingTop: 20,
    },
    fakeImage: {
        width: 43,
        height: 43,
        borderRadius: 3,
        backgroundColor: "#EAEDEE",
    },
    textPlaceholdersContainer: {
        flex: 1,
        justifyContent: "space-between",
        marginLeft: 8,
    },
    titlePlaceholder: {
        width: "30%",
        height: 22,
        borderRadius: 3,
        backgroundColor: "#EAEDEE",
        marginBottom: 8,
    },
    subtitlePlaceholder: {
        width: "60%",
        height: 22,
        borderRadius: 3,
        backgroundColor: "#EAEDEE",
    },
});
exports.default = Loading;
