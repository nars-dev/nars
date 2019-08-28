import * as React from "react";
import { darkGreen, green, offWhite, yellow, dark } from "./Colors";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import Animated from "react-native-reanimated";
import * as faker from "faker";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  },
  elementContainer: {
    paddingTop: 20
  },
  contentContainer: {
    padding: 16,
    backgroundColor: offWhite,
    borderRadius: 3
  }
});

//namespace Post {
export enum PostType {
  Text,
  Image,
  Loading
}

export type Post = { id: string } & (
  | { type: PostType.Loading }
  | { type: PostType.Text; text: string }
  | { type: PostType.Image; src: string; text: string });

export const generate7Posts = (): Post[] => {
  const randomPostGenerators: (() => Post)[] = [
    () => ({
      type: PostType.Text,
      text: faker.lorem.sentence(),
      id: faker.random.uuid()
    }),
    () => ({
      type: PostType.Image,
      src: faker.image.imageUrl(),
      text: faker.lorem.sentence(),
      id: faker.random.uuid()
    })
  ];

  const getRandomPost = () => ({
    ...randomPostGenerators[
      Math.floor(Math.random() * randomPostGenerators.length)
    ]()
  });

  return [0, 0, 0, 0, 0, 0, 0].map(getRandomPost);
};
//}

//namespace Loading {
const loadingStyles = StyleSheet.create({
  contentContainer: {
    flexDirection: "row"
  },
  fakeImage: {
    width: 43,
    height: 43,
    borderRadius: 3,
    backgroundColor: "#EAEDEE"
  },
  textPlaceholdersContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginLeft: 8
  },
  titlePlaceholder: {
    width: "30%",
    height: 22,
    borderRadius: 3,
    backgroundColor: "#EAEDEE",
    marginBottom: 8
  },
  subtitlePlaceholder: {
    width: "60%",
    height: 22,
    borderRadius: 3,
    backgroundColor: "#EAEDEE"
  }
});

const Loading = () => (
  <View style={styles.elementContainer}>
    <View style={[styles.contentContainer, loadingStyles.contentContainer]}>
      <View style={loadingStyles.fakeImage} />
      <View style={loadingStyles.textPlaceholdersContainer}>
        <View style={loadingStyles.titlePlaceholder} />
        <View style={loadingStyles.subtitlePlaceholder} />
      </View>
    </View>
  </View>
);
//}

//namespace TextPost {

const textPostStyles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: "Fira Code",
    color: dark
  }
});

const TextPost = ({ text }) => (
  <View style={styles.elementContainer}>
    <Text style={[styles.contentContainer, textPostStyles.text]}>{text}</Text>
  </View>
);
//}

//namespace ImagePost {

const imagePostStyles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: "Fira Code",
    color: dark,
    paddingTop: 16
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 29 / 18
  }
});

const ImagePost = ({ imageSrc, caption }) => (
  <View style={styles.elementContainer}>
    <View style={[styles.contentContainer]}>
      <Image style={imagePostStyles.image} source={{ uri: imageSrc }} />
      <Text style={imagePostStyles.text}>{caption}</Text>
    </View>
  </View>
);
//}

const renderItem = ({ item }: { item: Post }) => {
  switch (item.type) {
    case PostType.Text:
      return <TextPost text={item.text} />;
    case PostType.Image:
      return <ImagePost imageSrc={item.src} caption={item.text} />;
    case PostType.Loading:
      return <Loading />;
  }
};

const Component = ({ animationProgress }) => {
  const [posts, setPosts] = React.useState(generate7Posts);
  const loadMore = () => {
    setPosts([...posts, ...generate7Posts()]);
  };
  return (
    <Animated.View style={[{ opacity: animationProgress }, styles.container]}>
      <FlatList
        onEndReached={loadMore}
        onEndReachedThreshold={1}
        data={[...posts, { id: "loading", type: PostType.Loading }] as Post[]}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </Animated.View>
  );
};

export default {
  primaryColor: green,
  name: "Feed",
  render: (animationProgress: Animated.Node<number>) => (
    <Component animationProgress={animationProgress} />
  )
};
