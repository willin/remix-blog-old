import { json, LoaderFunction, useLoaderData } from 'remix';
import { MdxComponent } from '~/components/mdx';
import { getContent } from '~/services/content.server';
import { LoaderFunctionArgs, WContent } from '~/types';

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
    ...content
  });
};

export default function Index() {
  const { code, html } = useLoaderData<WContent>();
  return (
    <div>
      <MdxComponent code={code} html={html} />
    </div>
  );
}
