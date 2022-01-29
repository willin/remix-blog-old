import { json, type LoaderFunction, useLoaderData, MetaFunction } from 'remix';
import { PostList } from '~/components/posts/post-list';
import { siteTitle } from '~/config';
import { getContents } from '~/services/kv.server';
import { LoaderFunctionArgs, WPost } from '~/types';

export const loader: LoaderFunction = async ({
  context
}: LoaderFunctionArgs) => {
  const locale = 'zh';
  const type = 'posts';
  const { CONTENTS } = context.env;
  const posts = await getContents(CONTENTS, locale, type);
  return json({ posts }) as Partial<WPost>[];
};

export const meta: MetaFunction = () => ({
  title: `Posts - ${siteTitle}`,
  description: "Willin Wang's Posts"
});

export default function Posts() {
  const { posts } = useLoaderData<{ posts: WPost[] }>();

  return <PostList posts={posts} />;
}
