"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var View_1 = require("./View");
exports.View = View_1.default;
var Text_1 = require("./Text");
exports.Text = Text_1.default;
var FlatList_1 = require("./FlatList");
exports.FlatList = FlatList_1.default;
var Image_1 = require("./Image");
exports.Image = Image_1.default;
const StyleSheet = __importStar(require("./StyleSheet"));
exports.StyleSheet = StyleSheet;
var TextInput_1 = require("./TextInput");
exports.TextInput = TextInput_1.default;
var Switch_1 = require("./Switch");
exports.Switch = Switch_1.default;
var TouchableOpacity_1 = require("./TouchableOpacity");
exports.TouchableOpacity = TouchableOpacity_1.default;
var Wait_1 = require("./Wait");
exports.Wait = Wait_1.default;
const Static = __importStar(require("./Static"));
exports.Static = Static;
const Server = __importStar(require("./NarsServer.gen"));
exports.Server = Server;
__export(require("nars-common"));
const Animated = __importStar(require("./Animated"));
exports.Animated = Animated;
