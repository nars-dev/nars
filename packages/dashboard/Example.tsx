import React from "react";
import blessed from "blessed";
import { render } from "react-blessed";

import Process from "./Process";

const Example = () => {
  return (
    <blessed-element>
      <Process label="Client" arg="build-client" height="50%" width="100%" />

      <Process
        label="Server"
        arg="build-server"
        top="50%"
        height="50%"
        width="70%"
      />

      <Process
        label="Common"
        arg="build-common"
        top="50%"
        height="50%"
        width="30%"
        right="0"
      />
    </blessed-element>
  );
};

/**
 * Rendering the screen.
 */
const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: "Nars example dashboard",
});

screen.key(["escape", "q", "C-c"], function() {
  return process.exit(0);
});

render(<Example />, screen);
