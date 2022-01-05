import { json, useLoaderData, Meta, Link, useMatches } from 'remix';
import type { LoaderFunction } from 'remix';

export const loader: LoaderFunction = () => json({ page: 1 });

export default function HomePage() {
  const matches = useMatches();
  const data = useLoaderData<Record<string, unknown>>();
  return (
    <div>
      <Meta />
      <h1>test</h1>
      <Link to='/lang'>Home Lang</Link>
      <div>
        <pre>{JSON.stringify(matches)}</pre>
        <pre>{JSON.stringify(data)}</pre>
      </div>
    </div>
  );
}
