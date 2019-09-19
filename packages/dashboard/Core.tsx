import React from "react";
import blessed from "blessed";
import { render } from "react-blessed";

import Process from "./Process";

const Core = () => {
  return (
    <blessed-element>
      <Process label="Nars - TS" arg="build-nars-ts" height="50%" width="50%" />

      <Process
        label="Nars - RE"
        arg="build-nars-re"
        top="50%"
        height="50%"
        width="50%"
      />

      <Process
        label="Nars Client"
        arg="build-nars-client"
        right="0"
        height="50%"
        width="50%"
      />

      <Process
        label="Nars Common"
        arg="build-nars-common"
        top="50%"
        right="0"
        height="50%"
        width="50%"
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
  title: "Nars core dashboard",
});

screen.key(["escape", "q", "C-c"], function() {
  return process.exit(0);
});

render(<Core />, screen);
