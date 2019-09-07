import * as React from "react";
import { StyleSheet, View } from "nars";

const Loading = () => (
  <View style={styles.elementContainer}>
    <View style={styles.contentContainer}>
      <View style={styles.fakeImage} />
      <View style={styles.textPlaceholdersContainer}>
        <View style={styles.titlePlaceholder} />
        <View style={styles.subtitlePlaceholder} />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: "row",
  },
  elementContainer: {
    paddingTop: 20,
  },
  fakeImage: {
    width: 43,
    height: 43,
    borderRadius: 3,
    backgroundColor: "#EAEDEE",
  },
  textPlaceholdersContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginLeft: 8,
  },
  titlePlaceholder: {
    width: "30%",
    height: 22,
    borderRadius: 3,
    backgroundColor: "#EAEDEE",
    marginBottom: 8,
  },
  subtitlePlaceholder: {
    width: "60%",
    height: 22,
    borderRadius: 3,
    backgroundColor: "#EAEDEE",
  },
});

export default Loading;
