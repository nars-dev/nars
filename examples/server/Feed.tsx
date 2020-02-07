import * as React from "react";
import { FlatList, Wait, View } from "nars";
import { Post, PostType, generatePosts } from "./postGenerator";
import Loading from "./components/Loading";
import TextPost from "./components/TextPost";
import ImagePost from "./components/ImagePost";

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

type FetchStatus = ["pending"] | ["success", Post[]] | ["error"];

const fetchPosts = (timeout: number) => {
  let status: FetchStatus = ["pending"];
  let allPosts: Post[] = [];
  const fetch = () =>
    new Promise<Post[]>(resolve => {
      setTimeout(() => {
        resolve(generatePosts());
      }, timeout);
    });

  const suspender = fetch().then(
    res => {
      status = ["success", res];
    },
    _err => {
      status = ["error"];
    }
  );

  const read = () => {
    switch (status[0]) {
      case "pending":
        throw suspender;
      case "error":
        throw "error";
      case "success":
        allPosts = [...allPosts, ...status[1]];
        return allPosts;
    }
  };

  return { read };
};

const posts = fetchPosts(20000);

function Feed(props: { backgroundColor: string }) {
  const allPosts = posts.read();

  return (
    <FlatList
      style={{ backgroundColor: props.backgroundColor }}
      onEndReachedThreshold={0.3}
      data={[...allPosts, { id: "loading", type: PostType.Loading }] as Post[]}
      keyExtractor={item => item.item.id}
      renderItem={renderItem}
    />
  );
}

function FeedSuspense(props: { backgroundColor: string }) {
  return (
    <React.Suspense fallback={<Wait />}>
      <Feed backgroundColor={props.backgroundColor} />
    </React.Suspense>
  );
}

export default FeedSuspense;
