import { json } from 'remix';
import type { LoaderFunction } from 'remix';
import type { LoaderFunctionArgs } from '~/types';

export const loader: LoaderFunction = async ({
  context
}: LoaderFunctionArgs) => {
  const { CONTENTS } = context.env;
  const { keys } = await CONTENTS.list();

  const data = await Promise.all(keys.map((x) => CONTENTS.get(x.name, 'json')));
  return json({
    keys,
    data
  });
};
