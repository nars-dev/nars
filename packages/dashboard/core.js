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

const Cpre = () => {
  return (
    <element>
      <NarsTs height="50%" width="50%" />
      <NarsRe top="50%" height="50%" width="50%" />
      <NarsClient right="0" height="50%" width="50%" />
      <NarsCommon top="50%" right="0" height="50%" width="50%" />
    </element>
  );
};

/**
 * Rendering the screen.
 */
const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: "Nars core dashboard",
});

screen.key(["escape", "q", "C-c"], function(ch, key) {
  return process.exit(0);
});

render(<Cpre />, screen);
