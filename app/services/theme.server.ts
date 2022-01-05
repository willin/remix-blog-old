import { createThemeSessionResolver } from 'remix-themes';
import { createCookieSession } from './session.server';

export const themeSessionResolver = createThemeSessionResolver(
  createCookieSession('theme')
);
