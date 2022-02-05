import { Link } from 'remix';
import { formatNumber } from '~/lib/utils';
import { WPost } from '~/types';

export function PostMeta({ post, hide }: { post: WPost; hide: boolean }) {
  return (
    <div>
      <div className='badge badge-info mr-2 text-secondary'>
        发表于： {post.frontmatter.date}
      </div>
      {!hide && (
        <>
          <div className='badge badge-info mr-2 text-secondary'>
            阅读预计： {Math.ceil(post.frontmatter.readingTime?.minutes)} 分钟
          </div>
          <div className='badge badge-info mr-2 text-secondary'>
            文章字数： {formatNumber(post.frontmatter.readingTime?.words)}
          </div>
        </>
      )}
    </div>
  );
}

export function PostTags({ post }: { post: WPost }) {
  return (
    <div className='btn-group content-center'>
      {post.frontmatter.tags?.map((tag) => (
        <button className='btn btn-outline btn-xs' key={`${post.slug}-${tag}`}>
          <Link
            to={`/posts?search=${encodeURIComponent(tag)}`}
            className='no-underline'>
            {tag}
          </Link>
        </button>
      ))}
    </div>
  );
}
