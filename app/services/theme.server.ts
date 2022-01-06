import { createThemeSessionResolver } from 'remix-themes';
import { createCookieSession } from '~/utils/session.server';

export const themeSessionResolver = createThemeSessionResolver(
  createCookieSession('theme')
);
