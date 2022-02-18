import { getLocale } from '~/i18n';

export type JSONObject = {
  [key: string | number]: string | number | boolean | JSONObject | JSONObject[];
};

export async function fetcher<JSON = JSONObject>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, {
    headers: {
      'Content-Type': 'application/json',
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36'
    },
    ...(init || {})
  });
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
