import React from "react";
import { spawn } from "child_process";
import { stylesheet } from "./app";

export default class Common extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logs: [],
    };
  }

  componentDidMount() {
    const subprocess = spawn("yarn", ["build-common"], {
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
        label="Common"
        class={stylesheet.bordered}
        top="66%"
        width="50%"
        height="33%"
        draggable={true}
      >
        <list items={this.state.logs} />
      </box>
    );
  }
}
