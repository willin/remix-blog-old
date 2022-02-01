import { WPost } from '~/types';
import { groupBy } from './utils';

export interface BlogPostGroup {
  year: number;
  posts: WPost[];
}

export const sortBlogPosts = (
  blogPosts: WPost[] | undefined,
  query: string | undefined | null = null
): BlogPostGroup[] => {
  if (!blogPosts) return [];
  const filteredPosts = !query
    ? blogPosts
    : blogPosts.filter(
        (post) =>
          post.frontmatter.title?.toLowerCase().includes(query.toLowerCase()) ||
          post.frontmatter.description
            ?.toLowerCase()
            .includes(query.toLowerCase()) ||
          post.frontmatter.tags?.includes(query.toLowerCase())
      );
  const groups = groupBy(filteredPosts, (post) =>
    new Date(post.frontmatter.date).getFullYear()
  );
  return Object.keys(groups)
    .map((year) => ({
      year: +year,
      posts: groups[+year]
    }))
    .sort((a, b) => Number(b.year) - Number(a.year));
};

export const getAllTags = (posts: WPost[]): [string, number][] => {
  const tags: { [key: string]: number } = {};
  posts.forEach((post) => {
    post.frontmatter.tags?.forEach((tag) => {
      if (tags[tag]) tags[tag] += 1;
      else tags[tag] = 1;
    });
  });
  return Object.entries(tags).sort((a, b) => b[1] - a[1]);
};
