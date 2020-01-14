import * as React from "react";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { config } from "nars-examples-common";
import * as Nars from "nars-client";

import { darkGreen } from "./Colors";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});

const RemoteComponent = Nars.createRemoteComponentWithUrl(
  "ws://localhost:9000",
  config
);

const Component = ({ animationProgress }) => {
  return (
    <Animated.View style={[{ opacity: animationProgress }, styles.container]}>
      <RemoteComponent
        name="Form"
        props={{
          isCompany: true,
        }}
      />
    </Animated.View>
  );
};

export default {
  primaryColor: darkGreen,
  name: "Form",
  render: (animationProgress: Animated.Node<number>) => (
    <Component animationProgress={animationProgress} />
  ),
};
