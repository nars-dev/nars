import * as React from "react";
import { FlatList, Wait } from "nars";
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
  const [isWaiting, setIsWaiting] = React.useState(false);
  const loadMore = () => {
    setIsWaiting(true);
    setPosts([...posts, ...generatePosts()]);
    setTimeout(() => {
      setIsWaiting(false);
    }, 3000);
  };

  if (isWaiting) {
    return <Wait />;
  } else {
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
}

export default Feed;
