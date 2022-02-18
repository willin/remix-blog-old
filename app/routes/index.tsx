import { json, LoaderFunction, useLoaderData } from 'remix';
import { getContent } from '~/services/content.server';
import { LoaderFunctionArgs } from '~/types';

export const loader: LoaderFunction = async ({
  request,
  context
}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const content = await getContent({
    host: `${url.protocol}//${url.host}`,
    type: 'playground',
    slug: 'punycode',
    locale: 'zh'
  });
  return json({
    content
  });
};

export default function Index() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = useLoaderData();

  return (
    <div>
      <h1>Title</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
