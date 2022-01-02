import { createCookieSessionStorage } from 'remix';
import { createThemeSessionResolver } from 'remix-themes';

export const themeSessionResolver = createThemeSessionResolver(
  createCookieSessionStorage({
    cookie: {
      name: 'willin_theme',
      secure: true,
      sameSite: 'lax',
      secrets: ['wi11inw2n9'],
      path: '/',
      expires: new Date(new Date().getTime() + 86400000 * 36500),
      httpOnly: true
    }
  })
);
