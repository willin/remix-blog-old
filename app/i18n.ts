import { RemixI18n } from 'remix-i18n';
import { i18n as zh } from '~/i18n/zh';
import { i18n as en } from '~/i18n/en';

export const i18n = new RemixI18n({
  supportedLanguages: ['en', 'zh'],
  fallbackLng: 'zh'
});

export function getLocale(pathname: string): string {
  const [, locale = ''] = pathname.split('/');
  if (i18n.supportedLanguages.includes(locale)) {
    return locale;
  }
  return i18n.fallbackLng;
}

i18n.set('zh', zh);
i18n.set('en', en);
