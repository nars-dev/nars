import * as React from "react";
import { darkGreen, offWhite, yellow } from "./Colors";
import {
  StyleSheet,
  FlatList,
  TextInput,
  View,
  Switch,
  Text,
  TouchableOpacity
} from "react-native";
import Animated from "react-native-reanimated";
import * as Nars from "nars-client";
import { config } from "nars-examples-common";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  }
});

const RemoteComponent = Nars.createRemoteComponent(
  "ws://localhost:9000",
  config
);

const Component = ({ animationProgress }) => {
  const [isCompany, setIsCompany] = React.useState(false);
  return (
    <Animated.View style={[{ opacity: animationProgress }, styles.container]}>
      <RemoteComponent
        name="Form"
        props={{ backgroundColor: "red", textColor: "blue" }}
      />
    </Animated.View>
  );
};

export default {
  primaryColor: darkGreen,
  name: "Form",
  render: (animationProgress: Animated.Node<number>) => (
    <Component animationProgress={animationProgress} />
  )
};
