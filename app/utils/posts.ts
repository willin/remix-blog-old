import { allPosts } from '.contentlayer/data';

export const getPosts = (locale: string) => {
  console.log(locale);
  return allPosts;
};
