/**
 * @format
 */

import * as React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image
} from "react-native";
import * as Colors from "./Colors";
import Animated from "react-native-reanimated";

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  absoluteContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  },
  imageContainer: {
    position: "absolute",
    left: 18,
    right: 0,
    bottom: 0,
    top: 0
  },
  text: {
    color: Colors.offWhite,
    fontSize: 20,
    fontFamily: "Fira Code",
    fontWeight: "600",
    textAlign: "center"
  },
  header: {
    paddingTop: 8,
    paddingBottom: 8
  },
  image: {
    width: 19,
    height: 19
  }
});

export default ({
  children = null,
  name,
  animationProgress,
  onLayout,
  onClose
}) => {
  const viewRef: React.Ref<View> = React.useRef();
  return (
    <View
      ref={viewRef}
      onLayout={() =>
        viewRef.current && viewRef.current.measureInWindow(onLayout)
      }
      style={styles.absoluteContainer}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.background}>
        <View style={styles.header}>
          <Animated.View style={{ opacity: animationProgress }}>
            <Text style={styles.text}>{name}</Text>
            <View style={styles.imageContainer}>
              <TouchableOpacity onPress={onClose}>
                <Image
                  style={styles.image}
                  source={require("./assets/images/close_button.png")}
                />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
        {children}
      </SafeAreaView>
    </View>
  );
};
