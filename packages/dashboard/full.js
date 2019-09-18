import React from "react";
import blessed from "blessed";
import { render } from "react-blessed";

import Process from "./Process";

const Full = () => {
  return (
    <element>
      <Process label="Client" arg="build-client" height="33%" width="50%" />

      <Process
        label="Server"
        arg="build-server"
        top="33%"
        height="33%"
        width="50%"
      />

      <Process
        label="Common"
        arg="build-common"
        top="66%"
        height="33%"
        width="50%"
      />

      <Process
        label="Nars - TS"
        arg="build-nars-ts"
        right="0"
        height="25%"
        width="50%"
      />

      <Process
        label="Nars - RE"
        arg="build-nars-re"
        top="25%"
        right="0"
        height="25%"
        width="50%"
      />

      <Process
        label="Nars Client"
        arg="build-nars-client"
        top="50%"
        right="0"
        height="25%"
        width="50%"
      />

      <Process
        label="Nars Common"
        arg="build-nars-common"
        top="75%"
        right="0"
        height="25%"
        width="50%"
      />
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
