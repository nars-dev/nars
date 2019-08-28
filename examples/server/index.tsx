import * as React from "react";
import { Static } from "nars";
import { Server } from "ws";
import Form from "./Form";
import { config } from "../common";

/* Define which component is rendered per given route */
const components = {
  Form: props => <Form {...props} />
};

/* It accepts any ComponentType so a function would also work:
const components = {
  Form: (props) => <Form {...props} />
};

/* Create a router. config and components have to match! */
const router = Static.createRouter(config, components);

/* Create a server */
const webSocketServer = new Server({ port: 9000 });

/* Start listening for incoming requests */
Static.attatchListener(webSocketServer, router);
