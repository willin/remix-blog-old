import { json, useLoaderData } from 'remix';
import type { MetaFunction, LoaderFunction } from 'remix';
import { useMdxComponent } from '~/components/mdx';
import { LoaderFunctionArgs, WPost } from '~/types';
import { siteTitle } from '~/config';
import { PostMeta } from '~/components/posts/post-meta';

export const meta: MetaFunction = ({ data }: { data: WPost }) => {
  let title = siteTitle;
  let description = '';
  if (data?.frontmatter?.title) {
    title = `${data.frontmatter.title} - ${siteTitle}`;
    description = data.frontmatter.description ?? '';
  }
  return {
    title,
    description
  };
};

export const loader: LoaderFunction = async ({
  params,
  context
}: LoaderFunctionArgs) => {
  const { pages: slug } = params;
  if (!slug) {
    throw new Response('Not Found', { status: 404 });
  }
  const locale = 'zh';
  const type = 'pages';
  const { CONTENTS } = context.env;

  const data = await CONTENTS.get([locale, type, slug].join(':'), 'json');
  if (!data) {
    throw new Response('Not Found', { status: 404 });
  }

  return json(data);
};

export default function Post() {
  const post = useLoaderData<WPost>();
  const { html, frontmatter, code } = post;

  let Component = null;
  if (typeof window !== 'undefined' && code) {
    Component = useMdxComponent(code);
  }
  return (
    <main className='mx-8'>
      <div className='card glass prose max-w-none p-6 mb-6'>
        <h1 className='mb-2'>{frontmatter.title}</h1>
        <PostMeta post={post} />

        {Component ? (
          <div>
            <Component />
          </div>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: html }} />
        )}
      </div>
    </main>
  );
}
