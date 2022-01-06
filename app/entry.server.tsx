import { renderToString } from 'react-dom/server';
import { RemixServer } from 'remix';
import type { EntryContext } from 'remix';
import i18next from 'i18next';
import { RemixI18NextProvider } from 'remix-i18next';
import { init } from '~/utils/i18next';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  await init();

  const markup = renderToString(
    <RemixI18NextProvider i18n={i18next}>
      <RemixServer context={remixContext} url={request.url} />
    </RemixI18NextProvider>
  );

  responseHeaders.set('Content-Type', 'text/html');

  return new Response(`<!DOCTYPE html>${markup}`, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}
