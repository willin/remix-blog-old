import { Backend, RemixI18Next } from 'remix-i18next';
import { fallbackLng, supportedLngs } from '~/utils/i18next';

class InMemoryBackend implements Backend {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly data: {
      [locale: string]: {
        [namespace: string]: {
          [key: string]: string;
        };
      };
    }
  ) {}

  async getTranslations(namespace: string, locale: string) {
    await Promise.resolve();
    console.log(`getTranslations(${namespace}, ${locale})`);
    console.log(this.data);
    console.log(this.data.zh);
    return this.data[locale][namespace];
  }
}

export const i18n = new RemixI18Next(
  new InMemoryBackend({ en: { common: {} }, zh: { common: {} } }),
  { fallbackLng, supportedLanguages: supportedLngs }
);
