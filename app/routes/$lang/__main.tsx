import { json, useLoaderData, Link, useMatches, useCatch } from 'remix';
import type { LoaderFunction, MetaFunction } from 'remix';
import { useTranslation } from 'react-i18next';
import { useRemixI18Next } from 'remix-i18next';
import { supportedLngs } from '~/i18n.config';
import Document from '~/components/document';
import { i18n } from '~/services/i18n.server';

export const loader: LoaderFunction = async ({ params }) => {
  const { lang } = params;
  if (!supportedLngs.includes(lang)) {
    throw new Response('Not Found', {
      status: 404
    });
  }

  return json({
    locale: lang,
    i18n: await i18n.getTranslations(lang, ['site'])
  });
};

export const meta: MetaFunction = ({ data }) => ({
  title: 'Willin Wang',
  description: JSON.stringify(data)
});

export default function HomePage() {
  const matches = useMatches();
  const data = useLoaderData<Record<string, unknown>>();
  const { locale } = useLoaderData<{ locale: string }>();
  useRemixI18Next(locale);

  const { t } = useTranslation('site');
  return (
    <Document>
      <h1>{t('description')}</h1>
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
