import { json } from 'remix';
import type { ActionFunction } from 'remix';
import { sessionStore } from '~/services/session.server';
import { THEMES } from '~/config';

export const action: ActionFunction = async ({ request }) => {
  const session = await sessionStore.getSession(request.headers.get('Cookie'));

  const data: { theme: string } = await request.json();

  const theme = THEMES.includes(data.theme) ? data.theme : 'dark';

  session.set('theme', theme);

  return json(null, {
    headers: {
      'Set-Cookie': await sessionStore.commitSession(session)
    }
  });
};
