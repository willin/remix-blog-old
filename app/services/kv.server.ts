import { WPost } from '~/types';

export const getContents = async (
  kv: KVNamespace,
  locale: string,
  type: string
): Promise<WPost[]> => {
  const slugs = await kv.list({ prefix: [locale, type].join(':') });
  const contents = await Promise.all(
    slugs.keys.map(async ({ name }) => {
      const data = await kv.get<WPost>(name, 'json');
      const { slug, frontmatter, html } = data!;
      return { slug, frontmatter, html };
    })
  );
  const posts = contents.sort((a, b) =>
    new Date(a.frontmatter.date) < new Date(b.frontmatter.date) ? 1 : -1
  );

  return posts;
};

export const getContentBySlug = (
  kv: KVNamespace,
  locale: string,
  type: string,
  slug: string
): Promise<WPost> => kv.get<WPost>([locale, type, slug].join(':'), 'json');
