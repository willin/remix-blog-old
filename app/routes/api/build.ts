import { json, ActionFunction, json } from 'remix';
import type { LoaderFunction, ActionFunction } from 'remix';
import type { LoaderFunctionArgs } from '~/types';

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
    const data = await request.json();
    switch (request.method) {
      case 'PUT': {
        await CONTENTS.put('$$content-sha', JSON.stringify(data));
        break;
      }
      case 'POST': {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        await CONTENTS.put(data.slug, JSON.stringify(data));
        break;
      }
      case 'DELETE': {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        await CONTENTS.delete(data.slug);
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
