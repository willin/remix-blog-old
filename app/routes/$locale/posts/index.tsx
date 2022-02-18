import { json, type LoaderFunction, useLoaderData, MetaFunction } from 'remix';
import { PostList } from '~/components/posts/post-list';
import { i18n } from '~/i18n';
import { getMeta } from '~/services/content.server';
import { LoaderFunctionArgs, WMeta } from '~/types';
import { StickyShareButton } from '~/components/share';

export const loader: LoaderFunction = async ({
  params,
  request
}: LoaderFunctionArgs) => {
  const meta = await getMeta({ url: request.url, locale: params.locale });
  return json(meta);
};

export const meta: MetaFunction = () => ({
  title: `${i18n.t('nav.posts')} - ${i18n.t('site.title')}`
});

export default function Posts() {
  const meta = useLoaderData<WMeta>();

  return (
    <main>
      <PostList
        posts={meta.posts.filter((p) => p.type === 'posts')}
        tags={meta.tags}
      />
      <StickyShareButton />
    </main>
  );
}
