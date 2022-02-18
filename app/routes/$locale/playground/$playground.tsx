import { json, LoaderFunction, useLoaderData } from 'remix';
import { MdxComponent } from '~/components/mdx';
import { PostCopyright, PostMeta } from '~/components/posts/post-meta';
import { PostLayout } from '~/components/posts/post-prose';
import { getContent } from '~/services/content.server';
import { LoaderFunctionArgs, WContent } from '~/types';
import { StickyShareButton } from '~/components/share';

export { meta, links } from '../$pages';

export const loader: LoaderFunction = async ({
  params,
  request
}: LoaderFunctionArgs) => {
  const { locale, playground: slug } = params;
  if (!slug) {
    throw new Response('Not Found', { status: 404 });
  }
  const type = 'playground';

  const data = await getContent({ type, slug, url: request.url, locale });
  if (!data) {
    throw new Response('Not Found', { status: 404 });
  }

  return json(data);
};

export default function Post() {
  const post = useLoaderData<WContent>();
  const { html, frontmatter, code } = post;

  return (
    <main className='mx-8'>
      <PostLayout>
        <h1 className='mb-2'>{frontmatter.title}</h1>
        <PostMeta frontmatter={frontmatter} />
        <MdxComponent code={code} html={html} />
        <PostCopyright frontmatter={frontmatter} type='playground' />
      </PostLayout>
      <StickyShareButton />
    </main>
  );
}
