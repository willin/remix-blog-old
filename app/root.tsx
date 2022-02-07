import { json, useCatch, useLoaderData, Outlet } from 'remix';
import type {
  LinksFunction,
  MetaFunction,
  LoaderFunction,
  ShouldReloadFunction
} from 'remix';
import { ExternalScriptsFunction } from 'remix-utils';
import { Document } from '~/layout/document';
import { sessionStore } from '~/services/session.server';
import { ThemeProvider } from '~/layout/theme';
import { ErrorLayout } from '~/layout/error';
// eslint-disable-next-line import/no-unresolved
import tailwindStyles from '~/styles/global.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: tailwindStyles },
  { rel: 'shortcut icon', type: 'image/png', href: '/favicon.png' }
];

export const meta: MetaFunction = () => ({
  title: 'Willin Wang'
});

export type LoaderData = {
  theme: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await sessionStore.getSession(request.headers.get('Cookie'));
  const theme = (session.get('theme') as string) || 'dark';

  return json({ theme });
};

// https://remix.run/docs/en/v1/api/conventions#unstable_shouldreload
export const unstable_shouldReload: ShouldReloadFunction = ({ submission }) =>
  !!submission && submission.action === '/api/theme';

// create the scripts function with the correct type
const scripts: ExternalScriptsFunction = () => [
  {
    src: '/clipboard.js'
  },
  {
    async: true,
    src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5059418763237956',
    crossOrigin: 'anonymous'
  }
];

// and export it through the handle, you could also create it inline here
// if you don't care about the type
export const handle = { scripts };

export default function App() {
  const { theme } = useLoaderData<LoaderData>();

  return (
    <ThemeProvider specifiedTheme={theme}>
      <Document>
        <Outlet />
      </Document>
    </ThemeProvider>
  );
}
export function CatchBoundary() {
  const caught = useCatch();

  switch (caught.status) {
    case 401:
    case 404:
      return (
        <ThemeProvider>
          <Document title='404'>
            <ErrorLayout>
              <h1>
                {caught.status} {caught.statusText}
              </h1>
            </ErrorLayout>
          </Document>
        </ThemeProvider>
      );

    default:
      throw new Error(
        `Unexpected caught response with status: ${caught.status}`
      );
  }
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <ThemeProvider>
      <Document title='Uh-oh!'>
        <ErrorLayout>
          <h1>App Error</h1>
          <pre>{error.message}</pre>
          <p>
            Replace this UI with what you want users to see when your app throws
            uncaught errors.
          </p>
        </ErrorLayout>
      </Document>
    </ThemeProvider>
  );
}
