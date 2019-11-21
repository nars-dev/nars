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
const nars_1 = require("nars");
const postGenerator_1 = require("./postGenerator");
const Loading_1 = __importDefault(require("./components/Loading"));
const TextPost_1 = __importDefault(require("./components/TextPost"));
const ImagePost_1 = __importDefault(require("./components/ImagePost"));
const renderItem = ({ item }) => {
    switch (item.type) {
        case postGenerator_1.PostType.Text:
            return React.createElement(TextPost_1.default, { text: item.text });
        case postGenerator_1.PostType.Image:
            return React.createElement(ImagePost_1.default, { imageSrc: item.src, caption: item.text });
        case postGenerator_1.PostType.Loading:
            return React.createElement(Loading_1.default, null);
    }
};
function Feed(_) {
    const [posts, setPosts] = React.useState(postGenerator_1.generatePosts);
    const loadMore = () => {
        setPosts([...posts, ...postGenerator_1.generatePosts()]);
    };
    React.useEffect(() => {
        setTimeout(() => {
            setPosts([...posts, ...postGenerator_1.generatePosts()]);
        }, 1000);
    }, []);
    return (React.createElement(nars_1.FlatList, { onEndReached: loadMore, onEndReachedThreshold: 0.3, data: [...posts, { id: "loading", type: postGenerator_1.PostType.Loading }], keyExtractor: item => item.item.id, renderItem: renderItem }));
}
exports.default = Feed;
