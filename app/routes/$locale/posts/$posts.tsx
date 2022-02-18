import {
  json,
  LinksFunction,
  useLoaderData,
  MetaFunction,
  LoaderFunction
} from 'remix';
import { MdxComponent } from '~/components/mdx';
import { LoaderFunctionArgs, WContent } from '~/types';
import {
  PostCopyright,
  PostMeta,
  PostTags
} from '~/components/posts/post-meta';
import { StickyShareButton } from '~/components/share';
import { PostLayout } from '~/components/posts/post-prose';
import { i18n } from '~/i18n';
import { getContent } from '~/services/content.server';
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
  const { posts: slug, locale } = params;
  if (!slug) {
    throw new Response('Not Found', { status: 404 });
  }
  const type = 'posts';

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
        <h1 className='mb-2 text-primary'>{frontmatter.title}</h1>
        <PostMeta frontmatter={frontmatter} />

        <article className='article'>
          <MdxComponent code={code} html={html} />
        </article>

        <PostCopyright frontmatter={frontmatter} />

        <div className='flex my-2'>
          <div>本文标签：</div>
          <PostTags frontmatter={frontmatter} />
        </div>
      </PostLayout>
      <StickyShareButton />
    </main>
  );
}
