import * as React from "react";
import { StyleSheet, View, Text, Image } from "nars";

import { offWhite, dark } from "../Colors";

interface Props {
  imageSrc: string;
  caption: string;
}

const ImagePost = ({ imageSrc, caption }: Props) => (
  <View style={styles.elementContainer}>
    <View style={styles.contentContainer}>
      <Image style={styles.image} source={imageSrc} />
      <Text style={styles.text}>{caption}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: "Fira Code",
    color: dark,
    paddingTop: 16,
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 29 / 18,
  },
  elementContainer: {
    paddingTop: 20,
  },
  contentContainer: {
    padding: 16,
    backgroundColor: offWhite,
    borderRadius: 3,
  },
});

export default ImagePost;
