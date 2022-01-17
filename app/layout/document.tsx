import { Meta, Links, ScrollRestoration, Scripts, LiveReload } from 'remix';
import type { ReactNode } from 'react';

export function Document({
  children,
  title,
  theme
}: {
  children: ReactNode;
  title?: string;
  theme?: string;
}) {
  return (
    <html lang='zh-CN' data-theme={theme || 'dark'}>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}
