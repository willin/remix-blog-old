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
            .includes(query.toLowerCase())
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
