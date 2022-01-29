import { useMemo, useState } from 'react';
import { BlogPostGroup, sortBlogPosts } from '~/lib/posts';
import { debounce } from '~/lib/utils';
import { PostsGroup } from './posts-group';

export function PostList({ posts }: { posts: WPost[] }) {
  const [search, setSearch] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<BlogPostGroup[]>(
    sortBlogPosts(posts)
  );

  const debouncedFilter = debounce(() => {
    setFilteredPosts(sortBlogPosts(posts, search));
  }, 50);

  useMemo(() => {
    debouncedFilter();
  }, [search]);

  return (
    <>
      <div className='form-control my-2'>
        <div className='relative'>
          <input
            type='text'
            placeholder='Search'
            name='search'
            className='w-full pr-16 input input-primary input-bordered'
            onKeyDown={(e) =>
              e.key === 'Enter' &&
              setSearch((e.target as HTMLInputElement).value)
            }
            onBlur={(e) => setSearch((e.target as HTMLInputElement).value)}
          />
          <button className='absolute top-0 right-0 rounded-l-none btn btn-primary'>
            Go
          </button>
        </div>
      </div>
      {filteredPosts.length === 0 && (
        <div className='alert alert-info'>
          <div className='flex-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='w-6 h-6 mx-2 stroke-current'>
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
            </svg>
            <label>未找到文章</label>
          </div>
        </div>
      )}
      {filteredPosts.map((group, i) => (
        <PostsGroup
          key={`${i}-${group.year}`}
          year={group.year}
          posts={group.posts}
        />
      ))}
    </>
  );
}
