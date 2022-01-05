import type { Session } from 'remix';
import { createCookieSession } from './session.server';

enum Locale {
  en = 'en',
  zh = 'zh'
}

const locales: Array<Locale> = Object.values(Locale);

type LocaleSession = {
  getLocale: () => Locale | null;
  setLocale: (locale: Locale) => void;
  commit: () => Promise<string>;
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && locales.includes(value as Locale);
}

export type LocaleSessionResolver = (
  request: Request
) => Promise<LocaleSession>;

export const localeSessionResolver = async (
  request: Request
): Promise<LocaleSession> => {
  const cookieLocaleSession = createCookieSession('locale');
  const session: Session = await cookieLocaleSession.getSession(
    request.headers.get('Cookie')
  );

  return {
    getLocale: () => {
      const localeValue: unknown = session.get('locale');
      return isLocale(localeValue) ? localeValue : null;
    },
    setLocale: (locale: Locale) => session.set('locale', locale),
    commit: () => cookieLocaleSession.commitSession(session)
  };
};
