import * as React from "react";
import { spawn } from "child_process";

import stylesheet from "./stylesheet";

type Props = {
  label: string;
  arg: string;
  width: string;
  height: string;
  top?: string;
  right?: string;
  left?: string;
};

const Process = ({ width, height, top, right, left, label, arg }: Props) => {
  const [logs, setLogs] = React.useState<string[]>([]);

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
    <blessed-box
      label={label}
      class={stylesheet.bordered}
      top={top}
      right={right}
      left={left}
      width={width}
      height={height}
      draggable={true}
    >
      <blessed-list items={logs} />
    </blessed-box>
  );
};

export default Process;
