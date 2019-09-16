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

const Full = () => {
  return (
    <element>
      <Client height="33%" width="50%" />
      <Server top="33%" height="33%" width="50%" />
      <Common top="66%" height="33%" width="50%" />

      <NarsTs right="0" height="25%" width="50%" />
      <NarsRe top="25%" right="0" height="25%" width="50%" />
      <NarsClient top="50%" right="0" height="25%" width="50%" />
      <NarsCommon top="75%" right="0" height="25%" width="50%" />
    </element>
  );
};

/**
 * Rendering the screen.
 */
const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: "Nars dashboard",
});

screen.key(["escape", "q", "C-c"], function(ch, key) {
  return process.exit(0);
});

render(<Full />, screen);
