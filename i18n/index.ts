import { RemixI18nOptions } from 'remix-i18n';

export const config: RemixI18nOptions = {
  supportedLanguages: ['en', 'zh'],
  fallbackLng: 'zh'
};

export const languages = {
  zh: '简体中文',
  en: 'English'
};
