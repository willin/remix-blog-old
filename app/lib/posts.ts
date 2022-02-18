import { WFrontMatter } from '~/types';
import { groupBy } from './utils';

export interface BlogPostGroup {
  year: number;
  posts: WFrontMatter[];
}

export const sortBlogPosts = (
  blogPosts: WFrontMatter[] | undefined,
  query: string | undefined | null = null
): BlogPostGroup[] => {
  if (!blogPosts) return [];
  const filteredPosts = !query
    ? blogPosts
    : blogPosts.filter(
        (frontmatter) =>
          frontmatter.title?.toLowerCase().includes(query.toLowerCase()) ||
          frontmatter.description
            ?.toLowerCase()
            .includes(query.toLowerCase()) ||
          frontmatter.tags?.includes(query.toLowerCase())
      );
  const groups = groupBy(filteredPosts, (frontmatter) =>
    new Date(frontmatter.date).getFullYear()
  );
  return Object.keys(groups)
    .map((year) => ({
      year: +year,
      posts: groups[+year]
    }))
    .sort((a, b) => Number(b.year) - Number(a.year));
};
