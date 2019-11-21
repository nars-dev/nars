import * as React from "react";
import { FlatList } from "nars";

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

function Feed(props: { backgroundColor: string }) {
  const [posts, setPosts] = React.useState(generatePosts);
  const loadMore = () => {
    setPosts([...posts, ...generatePosts()]);
  };

  React.useEffect(() => {
    setTimeout(() => {
      setPosts([...posts, ...generatePosts()]);
    }, 1000);
  }, []);

  return (
    <FlatList
      style={{ backgroundColor: props.backgroundColor }}
      onEndReached={loadMore}
      onEndReachedThreshold={0.3}
      data={[...posts, { id: "loading", type: PostType.Loading }] as Post[]}
      keyExtractor={item => item.item.id}
      renderItem={renderItem}
    />
  );
}

export default Feed;
