import { Static } from "nars";
import { Server } from "ws";
import Form from "./Form";
import { config } from "../common";
import Feed from "./Feed";

/* Define which component is rendered per given route */
const components = {
  Form: Form,
  Feed: Feed,
};

/* Create a router. config and components have to match! */
const router = Static.createRouter(config, components);

/* Create a server */
const webSocketServer = new Server({ port: 9000 });

/* Start listening for incoming requests */
Static.attatchListener(webSocketServer, router);
