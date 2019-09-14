import React from "react";
import { spawn } from "child_process";
import { stylesheet } from "./app";

export default class NarsTs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logs: [],
    };
  }

  componentDidMount() {
    const subprocess = spawn("yarn", ["build-nars-ts"], {
      stdio: ["pipe", "pipe", "pipe"],
    });

    subprocess.stdout.on("data", data => {
      this.setState(state => ({
        logs: [data.toString("utf-8"), ...state.logs],
      }));
    });
  }

  render() {
    return (
      <box
        label="Nars - TS"
        class={stylesheet.bordered}
        width="50%"
        height="25%"
        right="0"
        draggable={true}
      >
        <list items={[...this.state.logs]} />
      </box>
    );
  }
}
