import React from "react";
import blessed from "blessed";
import { render } from "react-blessed";
import Server from "./Server";
import Client from "./Client";
import Common from "./Common";

const Examples = () => {
  return (
    <element>
      <Client height="50%" width="100%" />
      <Server top="50%" height="50%" width="70%" />
      <Common top="50%" height="50%" width="30%" right="0" />
    </element>
  );
};

/**
 * Rendering the screen.
 */
const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: "Nars examples dashboard",
});

screen.key(["escape", "q", "C-c"], function(ch, key) {
  return process.exit(0);
});

render(<Examples />, screen);
