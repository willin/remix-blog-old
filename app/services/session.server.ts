import { createCookieSessionStorage } from 'remix';

export const createCookieSession = (name: string) =>
  createCookieSessionStorage({
    cookie: {
      name: `willin_${name}`,
      secure: true,
      sameSite: 'lax',
      secrets: ['wi11inw2n9'],
      path: '/',
      expires: new Date(new Date().getTime() + 86400000 * 36500),
      httpOnly: true
    }
  });
