import { type ActionFunction, json } from 'remix';
import { localeSessionResolver, isLocale } from '~/services/locale.server';

export const action: ActionFunction = async ({ request }) => {
  const session = await localeSessionResolver(request);
  const { locale } = await request.json<{ locale: string }>();
  if (!isLocale(locale)) {
    return json({
      success: false,
      message: `theme value of ${locale} is not a valid theme.`
    });
  }
  session.setLocale(locale);
  return json(
    { success: true },
    {
      headers: { 'Set-Cookie': await session.commit() }
    }
  );
};
