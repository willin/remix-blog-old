import { BlogPostGroup } from '~/lib/posts';
import { WFrontMatter } from '~/types';
import { LocaleLink } from '../atom/locale-link';
import { PostMeta, PostTags } from './post-meta';

export function PostCard({ frontmatter }: { frontmatter: WFrontMatter }) {
  return (
    <div className='card glass lg:card-side text-neutral-content my-2'>
      <figure className='p-6'>
        <img
          alt='thumbnail'
          src={
            frontmatter.image ||
            'https://via.placeholder.com/300x200?text=%E6%97%A0%E5%9B%BE'
          }
          className='rounded-lg shadow-lg overflow-hidden h-[200px] !w-[300px]'
        />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>
          <LocaleLink to={`/posts/${frontmatter.slug}`}>
            {frontmatter.title}
          </LocaleLink>
        </h2>
        <PostMeta frontmatter={frontmatter} />
        <p>{frontmatter.description}</p>
        <div className='card-actions'>
          <PostTags frontmatter={frontmatter} />
        </div>
      </div>
    </div>
  );
}

export function PostsGroup({ year, posts }: BlogPostGroup) {
  return (
    <>
      <div className='tabs'>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className='tab tab-lifted tab-active'>{year}</a>
        <div className='flex-1 cursor-default tab tab-lifted'></div>
      </div>
      {posts.map((post, i) => (
        <PostCard key={`${i}-${post.slug}`} frontmatter={post} />
      ))}
    </>
  );
}
