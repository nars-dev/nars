import React from "react";
import { spawn } from "child_process";

import stylesheet from "./stylesheet";

// type Props = {
//   label: string;
//   arg: string;
//   width: string;
//   height: string;
//   top: string;
//   right: string;
//   left: string;
// };

const Pro = ({ width, height, top, right, left, label, arg }) => {
  const [logs, setLogs] = React.useState([]);

  React.useEffect(() => {
    const subprocess = spawn("yarn", [arg], {
      stdio: ["pipe", "pipe", "pipe"],
    });

    subprocess.stdout.on("data", data => {
      setLogs(state => [data.toString("utf-8"), ...state]);
    });

    return () => subprocess.kill();
  }, []);

  return (
    <box
      label={label}
      class={stylesheet.bordered}
      top={top}
      right={right}
      left={left}
      width={width}
      height={height}
      draggable={true}
    >
      <list items={logs} />
    </box>
  );
};

export default Pro;
