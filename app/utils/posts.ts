import { allPosts } from '.contentlayer/data/index.mjs';

export const getPosts = (locale: string) => {
  console.log(locale);
  return allPosts;
};
