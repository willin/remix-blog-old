export type JSONObject = {
  [key: string | number]: string | number | boolean | JSONObject | JSONObject[];
};

export default async function fetcher<JSON = JSONObject>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

const BASE_URL = '/_content/';

export const getMeta = (host: string, locale: string) =>
  fetcher(`${host}${BASE_URL}${locale}/meta.json`);

export const getContent = (meta: {
  host: string;
  locale: string;
  type: string;
  slug: string;
}) => {
  const { host, locale, type, slug } = meta;
  return fetcher(`${host}${BASE_URL}${locale}/${type}/${slug}.json`);
};
