import * as faker from "faker";

export enum PostType {
  Text,
  Image,
  Loading,
}

export type Post = { id: string } & (
  | { type: PostType.Loading }
  | { type: PostType.Text; text: string }
  | { type: PostType.Image; src: string; text: string });

export const generatePosts = (): Post[] => {
  const randomPostGenerators: (() => Post)[] = [
    () => ({
      type: PostType.Text,
      text: faker.lorem.sentence(),
      id: faker.random.uuid(),
    }),
    () => ({
      type: PostType.Image,
      src: faker.image.imageUrl(),
      text: faker.lorem.sentence(),
      id: faker.random.uuid(),
    }),
  ];

  const getRandomPost = () => ({
    ...randomPostGenerators[
      Math.floor(Math.random() * randomPostGenerators.length)
    ](),
  });

  return Array.from({ length: 7 }).map(getRandomPost);
};
