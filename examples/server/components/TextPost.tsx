import * as React from "react";
import { StyleSheet, View, Text } from "nars";
import { dark, offWhite } from "../Colors";

const TextPost = ({ text }: { text: string }) => (
  <View style={styles.elementContainer}>
    <Text style={textPostStyles.text}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  elementContainer: {
    paddingTop: 20,
  },
});

const textPostStyles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: "Fira Code",
    color: dark,
    padding: 16,
    backgroundColor: offWhite,
    borderRadius: 3,
  },
});

export default TextPost;
