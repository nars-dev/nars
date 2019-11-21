"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker = __importStar(require("faker"));
var PostType;
(function (PostType) {
    PostType[PostType["Text"] = 0] = "Text";
    PostType[PostType["Image"] = 1] = "Image";
    PostType[PostType["Loading"] = 2] = "Loading";
})(PostType = exports.PostType || (exports.PostType = {}));
exports.generatePosts = () => {
    const randomPostGenerators = [
        () => ({
            type: PostType.Text,
            text: faker.lorem.sentence(),
            id: faker.random.uuid(),
        }),
        () => ({
            type: PostType.Image,
            src: faker.image.imageUrl(),
            text: faker.lorem.sentence(),
            id: faker.random.uuid(),
        }),
    ];
    const getRandomPost = () => (Object.assign({}, randomPostGenerators[Math.floor(Math.random() * randomPostGenerators.length)]()));
    return Array.from({ length: 7 }).map(getRandomPost);
};
