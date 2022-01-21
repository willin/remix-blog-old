import { Meta, Links, ScrollRestoration, Scripts, LiveReload } from 'remix';
import type { ReactNode } from 'react';
import { Header } from '~/components/header';
import clsx from 'classnames';
import { THEMES_DARK } from '~/config';
import { useTheme } from './theme';

export function Document({
  children,
  title
}: {
  children: ReactNode;
  title?: string;
  theme: string;
}) {
  const [theme] = useTheme();

  return (
    <html lang='zh-CN' data-theme={theme}>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        <div
          id='background'
          className={clsx({ dark: THEMES_DARK.includes(theme) })}></div>
        <Header></Header>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}
