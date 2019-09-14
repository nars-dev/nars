import React from "react";
import blessed from "blessed";
import { render } from "react-blessed";
import Server from "./Server";
import Client from "./Client";
import Common from "./Common";
import NarsTs from "./NarsTs";
import NarsRe from "./NarsRe";
import NarsClient from "./NarsClient";
import NarsCommon from "./NarsCommon";

const Dashboard = () => {
  return (
    <element>
      <Client />
      <Server />
      <Common />

      <NarsTs />
      <NarsRe />
      <NarsClient />
      <NarsCommon />
    </element>
  );
};

export const stylesheet = {
  bordered: {
    border: {
      type: "line",
    },
    style: {
      border: {
        fg: "blue",
      },
    },
  },
};

/**
 * Rendering the screen.
 */
const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: "react-blessed dashboard",
});

screen.key(["escape", "q", "C-c"], function(ch, key) {
  return process.exit(0);
});

render(<Dashboard />, screen);
