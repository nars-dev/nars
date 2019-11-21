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
const Colors_1 = require("../Colors");
const TextPost = ({ text }) => (React.createElement(nars_1.View, { style: styles.elementContainer },
    React.createElement(nars_1.Text, { style: textPostStyles.text }, text)));
const styles = nars_1.StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    elementContainer: {
        paddingTop: 20,
    },
});
const textPostStyles = nars_1.StyleSheet.create({
    text: {
        fontSize: 16,
        fontFamily: "Fira Code",
        color: Colors_1.dark,
        padding: 16,
        backgroundColor: Colors_1.offWhite,
        borderRadius: 3,
    },
});
exports.default = TextPost;
