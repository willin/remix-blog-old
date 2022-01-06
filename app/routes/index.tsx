import { redirect, type ActionFunction, type LoaderFunction } from 'remix';
import { i18n } from '~/services/i18n.server';

export const action: ActionFunction = async ({ request }) => {
  const locale = await i18n.getLocale(request);
  return redirect(`/${locale}`);
};

export const loader: LoaderFunction = async ({ request }) => {
  const locale = await i18n.getLocale(request);
  return redirect(`/${locale}`);
};
