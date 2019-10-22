"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nars_1 = require("nars");
const ws_1 = require("ws");
const Form_1 = __importDefault(require("./Form"));
const common_1 = require("../common");
const Feed_1 = __importDefault(require("./Feed"));
/* Define which component is rendered per given route */
const components = {
    Form: Form_1.default,
    Feed: Feed_1.default,
};
/* Create a router. config and components have to match! */
const router = nars_1.Static.createRouter(common_1.config, components);
/* Create a server */
const webSocketServer = new ws_1.Server({ port: 9000 });
/* Start listening for incoming requests */
nars_1.Static.attatchListener(webSocketServer, router);
