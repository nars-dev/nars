import * as React from "react";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { config } from "nars-examples-common";
import * as Nars from "nars-client";

import { green } from "./Colors";

const { Feed } = Nars.createRemoteComponentWithUrl(
  "ws://localhost:9000",
  config
);

const Component = ({ animationProgress }) => {
  return (
    <Animated.View style={[{ opacity: animationProgress }, styles.container]}>
      <Feed backgroundColor={"yellow"} />
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
  primaryColor: green,
  name: "Feed",
  render: (animationProgress: Animated.Node<number>) => (
    <Component animationProgress={animationProgress} />
  ),
};
