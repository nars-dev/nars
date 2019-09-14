import React from "react";
import { spawn } from "child_process";
import { stylesheet } from "./app";

export default class Client extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logs: [],
    };
  }

  componentDidMount() {
    const subprocess = spawn("yarn", ["build-client"], {
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
        label="Client"
        class={stylesheet.bordered}
        width="50%"
        height="33%"
        draggable={true}
      >
        <list items={this.state.logs} />
      </box>
    );
  }
}
