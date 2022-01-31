import { Link } from 'remix';
import { BlogPostGroup } from '~/lib/posts';
import { WPost } from '~/types';
import { PostMeta, PostTags } from './post-meta';

export function PostCard({ post }: { post: WPost }) {
  return (
    <div className='card glass lg:card-side text-neutral-content my-2'>
      <figure className='p-6'>
        <img
          src={
            post.frontmatter.image ||
            'https://via.placeholder.com/300x200?text=%E6%97%A0%E5%9B%BE'
          }
          className='rounded-lg shadow-lg overflow-hidden h-[200px] !w-[300px]'
        />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>
          <Link to={`/posts/${post.slug}`}>{post.frontmatter.title}</Link>
        </h2>
        <PostMeta post={post} />
        <p>{post.frontmatter.description}</p>
        <div className='card-actions'>
          <PostTags post={post} />
        </div>
      </div>
    </div>
  );
}

export function PostsGroup({ year, posts }: BlogPostGroup) {
  return (
    <>
      <div className='tabs'>
        <a className='tab tab-lifted tab-active'>{year}</a>
        <div className='flex-1 cursor-default tab tab-lifted'></div>
      </div>
      {posts.map((post, i) => (
        <PostCard key={`${i}-${post.slug}`} post={post} />
      ))}
    </>
  );
}
