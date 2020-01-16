import * as React from "react";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { config } from "nars-examples-common";
import * as Nars from "nars-client";

import { lightGreen } from "./Colors";

const RemoteComponent = Nars.createRemoteComponentWithUrl(
  "ws://localhost:9000",
  config
);

const Component = ({ animationProgress }) => {
  return (
    <Animated.View style={[{ opacity: animationProgress }, styles.container]}>
      <RemoteComponent
        name="ProgressBar"
        props={{ height: 30 }}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default {
  primaryColor: lightGreen,
  name: "Progress bar",
  render: (animationProgress: Animated.Node<number>) => (
    <Component animationProgress={animationProgress} />
  ),
};
