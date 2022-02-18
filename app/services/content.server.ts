import { getLocale } from '~/i18n';

export type JSONObject = {
  [key: string | number]: string | number | boolean | JSONObject | JSONObject[];
};

export default async function fetcher<JSON = JSONObject>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json().catch(() => undefined);
}

const BASE_URL = '/_content/';

export const getMeta = (meta: { url: string; locale?: string }) => {
  const { url } = meta;
  const u = new URL(url);
  const { locale = getLocale(u.pathname) } = meta;
  return fetcher(`${u.protocol}//${u.host}${BASE_URL}${locale}/meta.json`);
};

export const getContent = (meta: {
  url: string;
  type: string;
  slug: string;
  locale?: string;
}) => {
  const { url, type, slug } = meta;
  const u = new URL(url);
  const { locale = getLocale(u.pathname) } = meta;
  return fetcher(
    `${u.protocol}//${u.host}${BASE_URL}${locale}/${type}/${slug}.json`
  );
};
