import { json, LoaderFunction, useLoaderData } from 'remix';
import { MdxComponent } from '~/components/mdx';
import { getContent } from '~/services/content.server';
import { LoaderFunctionArgs, WContent } from '~/types';

export const loader: LoaderFunction = async ({
  request,
  context,
  params
}: LoaderFunctionArgs) => {
  const content = await getContent({
    url: request.url,
    type: 'playground',
    slug: 'punycode',
    locale: params.locale
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
