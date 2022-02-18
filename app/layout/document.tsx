import {
  Meta,
  Links,
  ScrollRestoration,
  Scripts,
  LiveReload,
  useLocation
} from 'remix';
import { ReactNode, useEffect } from 'react';
import clsx from 'classnames';
import { ExternalScripts } from 'remix-utils';
import { Header } from '~/components/header';
import { THEMES_DARK, useTheme } from '~/hooks/use-theme';
import { LoadingToast } from '~/components/toast';
import { Footer } from '~/components/footer';
import { useI18n } from 'remix-i18n';
import { getLocale } from '~/i18n';

export function Document({
  children,
  title
}: {
  children: ReactNode;
  title?: string;
  theme: string;
}) {
  const [theme] = useTheme();

  const i18n = useI18n();
  const location = useLocation();
  useEffect(() => {
    const locale = getLocale(location.pathname);
    if (locale !== i18n.locale()) {
      i18n.locale(locale);
    }
  }, [location]);

  return (
    <html lang={i18n.locale()} data-theme={theme}>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
        <ExternalScripts />
      </head>
      <body>
        <div
          id='background'
          className={clsx({ dark: THEMES_DARK.includes(theme) })}></div>
        <Header />
        <div className='pt-20' style={{ minHeight: 'calc(100vh - 75px)' }}>
          {children}
        </div>
        <Footer />
        <LoadingToast />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}
