import { LoaderFunction, useLoaderData } from 'remix';
import { getPosts } from '~/utils/posts';

export const loader: LoaderFunction = () => {
  const posts = getPosts();
  return {
    posts
  };
};

export default function PostsPage() {
  const data = useLoaderData();

  return (
    <div>
      <h2>demo</h2>
      {data.posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
