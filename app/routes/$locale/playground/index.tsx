import { json, type LoaderFunction, useLoaderData, MetaFunction } from 'remix';
import { LocaleLink } from '~/components/atom/locale-link';
import { PostMeta } from '~/components/posts/post-meta';
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
  title: `${i18n.t('nav.playground')} - ${i18n.t('site.title')}`
});

export default function Posts() {
  const meta = useLoaderData<WMeta>();

  return (
    <>
      {meta.posts
        .filter((p) => p.type === 'playground')
        .map((frontmatter) => (
          <div
            key={frontmatter.slug}
            className='card glass lg:card-side text-neutral-content my-2'>
            <div className='card-body'>
              <h2 className='card-title'>
                <LocaleLink to={`/playground/${frontmatter.slug}`}>
                  {frontmatter.title}
                </LocaleLink>
              </h2>
              <PostMeta frontmatter={frontmatter} />
              <p>{frontmatter.description}</p>
            </div>
          </div>
        ))}
      <StickyShareButton />
    </>
  );
}
