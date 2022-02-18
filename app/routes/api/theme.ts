import { json, redirect } from 'remix';
import type { ActionFunction, LoaderFunction } from 'remix';
import { sessionStore } from '~/services/session.server';
import { THEMES } from '~/hooks/use-theme';

export const action: ActionFunction = async ({ request }) => {
  switch (request.method) {
    case 'PUT':
    case 'POST': {
      const session = await sessionStore.getSession(
        request.headers.get('Cookie')
      );
      const data: { theme: string } = await request.json();
      const theme = THEMES.includes(data.theme) ? data.theme : 'dark';
      session.set('theme', theme);
      return json(
        { success: true },
        {
          headers: {
            'Set-Cookie': await sessionStore.commitSession(session)
          }
        }
      );
    }
    default: {
      return json(
        { success: false },
        {
          status: 403
        }
      );
    }
  }
};

export const loader: LoaderFunction = () => {
  throw redirect('/');
};
