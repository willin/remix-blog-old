import { json } from 'remix';
import type { LoaderFunction, ActionFunction } from 'remix';
import type { LoaderFunctionArgs, WPost } from '~/types';
import { locales } from '~/i18n';

export const action: ActionFunction = async ({
  request,
  context
}: LoaderFunctionArgs) => {
  const { CONTENTS, API_KEY } = context.env;
  const key = request.headers.get('Authorization') ?? '';
  if (key !== `Bearer ${API_KEY}`) {
    return new Response(`Unauthorized ${key}`, { status: 401 });
  }
  try {
    const data: WPost = await request.json();

    switch (request.method) {
      case 'PUT': {
        await CONTENTS.put('$$content-sha', JSON.stringify(data));
        break;
      }
      case 'POST': {
        const { locale, slug, type } = data;
        await CONTENTS.put(
          [locale, type, slug].join(':'),
          JSON.stringify(data)
        );
        break;
      }
      case 'DELETE': {
        const { locale, slug, type } = data;
        if (locale) {
          await CONTENTS.delete([locale, type, slug].join(':'));
        } else {
          await Promise.all(
            locales.map((locale) =>
              CONTENTS.delete([locale, type, slug].join(':'))
            )
          );
        }
        break;
      }
      default: {
        return new Response(`Unsupported ${request.method}`, {
          status: 400
        });
      }
    }
    return json({ success: true });
  } catch (err) {
    const e: Error = err;
    return json(
      { message: e.message, stack: e.stack },
      {
        status: 500
      }
    );
  }
};

export const loader: LoaderFunction = async ({
  context
}: LoaderFunctionArgs) => {
  const { CONTENTS } = context.env;
  const data = (await CONTENTS.get('$$content-sha', 'json')) || {
    commit: { sha: '' }
  };
  return json(data);
};
