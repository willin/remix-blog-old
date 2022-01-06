import clsx from 'classnames';
import {
  useMatches,
  Meta,
  Links,
  ScrollRestoration,
  Scripts,
  LiveReload
} from 'remix';
import {
  ThemeProvider,
  PreventFlashOnWrongTheme,
  useTheme
} from 'remix-themes';
import Drawer from './navbar/drawer';

function App({ children }: { children: ReactNode }) {
  const matches = useMatches();
  const [{ params, data }] = matches;
  const { lang } = params;
  const { theme: sessionTheme }: { theme: string } = data;

  const [theme = 'dark'] = useTheme();

  return (
    <html
      lang={lang}
      className={clsx(theme)}
      data-theme={theme === 'light' ? 'retro' : 'cyberpunk'}>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(sessionTheme)} />
        <Links />
      </head>
      <body>
        <div id='background' className='dark:dark-bg'></div>
        <div
          id='app'
          className='relative pt-8 px-8 w-full mx-auto max-w-screen-2xl'>
          {children}
        </div>
        <Drawer />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

export default function Document({ children }: { children: ReactNode }) {
  const matches = useMatches();
  const [{ data }] = matches;
  const { theme }: { theme: string } = data;
  return (
    <ThemeProvider specifiedTheme={theme} themeAction='action/set-theme'>
      <App>{children}</App>
    </ThemeProvider>
  );
}
