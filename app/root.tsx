import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  json,
  useLoaderData,
  useCatch,
  ScrollRestoration
} from 'remix';
import type {
  LoaderFunction,
  LinksFunction,
  MetaFunction,
  MetaFunction
} from 'remix';
import {
  ThemeProvider,
  useTheme,
  PreventFlashOnWrongTheme,
  type Theme
} from 'remix-themes';
import cls from 'classnames';
import styles from './styles/global.css';
import { themeSessionResolver } from './services/theme.server';
import DrawerMenu from './components/navbar/drawer';
import { ViewsModel } from './services/views.server';
// import Logo from './components/navbar/logo';

export const links: LinksFunction = () => [
  { rel: 'shortcut icon', href: '/favicon.ico' },
  { rel: 'stylesheet', href: styles }
];

export const meta: MetaFunction = () => ({
  title: 'New Remix App',
  description: 'A new remix app'
});

export type LoaderData = {
  requestInfo: {
    session: {
      theme: Theme | null;
    };
  };
};

export type CustomEnv = {
  VIEWS: KVNamespace;
};

export type AppContext = {
  env: CustomEnv;
};

export const loader: LoaderFunction = async ({
  params,
  request,
  context = {}
}) => {
  const { env = {} }: CustomEnv = context as AppContext;
  const { getTheme } = await themeSessionResolver(request);
  const url = new URL(request.url);
  const slug = url.pathname;
  const { lang = 'cn' } = params as Params;
  // eslint-disable-next-line
  const PV = new ViewsModel(env.VIEWS);
  const views = await PV.visit(slug);

  // const pv = await (context.env.VIEWS as KVNamespace).get('total', 'text');
  const data: LoaderData = {
    lang,
    slug,
    views,
    requestInfo: {
      session: {
        theme: getTheme()
      }
    }
  };

  return json(data);
};

function App() {
  const data = useLoaderData<LoaderData>();
  const [theme = 'dark'] = useTheme();

  return (
    <html
      lang='en'
      className={cls(theme)}
      data-theme={theme === 'light' ? 'retro' : 'cyberpunk'}>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <Meta />
        <PreventFlashOnWrongTheme
          ssrTheme={Boolean(data.requestInfo.session.theme)}
        />
        <Links />
      </head>
      <body>
        <div id='background' className='dark:dark-bg'></div>
        <div id='app' className='relative'>
          <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
          <Outlet />
        </div>
        <DrawerMenu />

        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  const data = useLoaderData<LoaderData>();

  return (
    <ThemeProvider
      specifiedTheme={data.requestInfo.session.theme}
      themeAction='action/set-theme'>
      <App />
    </ThemeProvider>
  );
}

// best effort, last ditch error boundary. This should only catch root errors
// all other errors should be caught by the index route which will include
// the footer and stuff, which is much better.
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <html lang='en'>
      <head>
        <title>Oh no...</title>
        <Meta />
        <Links />
      </head>
      <body className='bg-primary'>
        {/* <ServerError error={error} /> */}
        500
      </body>
      <Scripts />
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  console.error('CatchBoundary', caught);
  if (caught.status === 404) {
    return (
      <html lang='en'>
        <head>
          <title>Oh no...</title>
          <Meta />
          <Links />
        </head>
        <body className='bg-primary'>
          {/*  */}
          404
        </body>
        <Scripts />
      </html>
    );
  }
  throw new Error(`Unhandled error: ${caught.status}`);
}
