import { json, useLoaderData, type LoaderFunction } from 'remix';
import { useMdxComponent } from '~/components/mdx';
import { LoaderFunctionArgs, WPost } from '~/types';

export const loader: LoaderFunction = async ({
  params,
  context
}: LoaderFunctionArgs) => {
  const { slug } = params;
  if (!slug) {
    throw new Response('Not Found', { status: 404 });
  }
  const locale = 'zh';
  const type = 'posts';
  const { CONTENTS } = context.env;

  const data = await CONTENTS.get([locale, type, slug].join(':'), 'json');
  if (!data) {
    throw new Response('Not Found', { status: 404 });
  }

  return json(data);
};

export default function Post() {
  const { html, frontmatter, code } = useLoaderData<WPost>();

  let Component = null;
  if (typeof window !== 'undefined' && code) {
    Component = useMdxComponent(code);
  }
  return (
    <>
      {Component ? (
        <main className='prose dark:prose-invert prose-slate'>
          <Component />
        </main>
      ) : (
        <main
          className='prose dark:prose-invert prose-slate'
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </>
  );
}
