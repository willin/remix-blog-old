import { json, useLoaderData, Link, useMatches, useCatch } from 'remix';
import type { LoaderFunction, MetaFunction } from 'remix';
import { supportedLngs } from '~/utils/i18next';
import Document from '~/components/document';

export const loader: LoaderFunction = ({ params }) => {
  const { lang } = params;
  console.log(lang);
  if (!supportedLngs.includes(lang)) {
    throw new Response('Not Found', {
      status: 404
    });
  }
  return json({ page: 1 });
};

export const meta: MetaFunction = ({ data }) => ({
  title: 'Willin Wang',
  description: JSON.stringify(data)
});

export default function HomePage() {
  const matches = useMatches();
  const data = useLoaderData<Record<string, unknown>>();

  return (
    <Document>
      <h1>test</h1>
      <Link to='/lang'>Home Lang</Link>
      <main className='prose max-w-none'>
        <pre>{JSON.stringify(matches)}</pre>
        <pre>{JSON.stringify(data)}</pre>
      </main>
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  console.error('CatchBoundary', caught);

  if (caught.status === 404) {
    return (
      <Document>
        <h1>Oh no...</h1>
        <p>404</p>
      </Document>
    );
  }
  throw new Error(`Unhandled error: ${caught.status}`);
}

// best effort, last ditch error boundary. This should only catch root errors
// all other errors should be caught by the index route which will include
// the footer and stuff, which is much better.
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document>
      <h1>Oh no...</h1>
      <p>500</p>
    </Document>
  );
}
