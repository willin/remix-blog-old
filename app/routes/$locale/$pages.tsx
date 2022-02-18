import { json, LinksFunction, useLoaderData } from 'remix';
import type { MetaFunction, LoaderFunction } from 'remix';
import { MdxComponent } from '~/components/mdx';
import { LoaderFunctionArgs, WContent } from '~/types';
import { i18n } from '~/i18n';
import { getContent } from '~/services/content.server';
import { PostCopyright, PostMeta } from '~/components/posts/post-meta';
import { PostLayout } from '~/components/posts/post-prose';
// eslint-disable-next-line import/no-unresolved
import customCodeCss from '~/styles/code.css';

export const meta: MetaFunction = ({ data }: { data: WContent }) => {
  let title = i18n.t('site.title');
  let description = '';
  if (data?.frontmatter?.title) {
    title = `${data.frontmatter.title} - ${title}`;
    description = data.frontmatter.description ?? '';
  }
  return {
    title,
    description
  };
};

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: customCodeCss
  }
];

export const loader: LoaderFunction = async ({
  params,
  request
}: LoaderFunctionArgs) => {
  const { locale, pages: slug } = params;
  if (!slug) {
    throw new Response('Not Found', { status: 404 });
  }
  const type = 'pages';

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
        <PostCopyright frontmatter={frontmatter} type='pages' />
      </PostLayout>
    </main>
  );
}
