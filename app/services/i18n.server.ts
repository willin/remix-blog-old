import { Backend, RemixI18Next } from 'remix-i18next';
import { fallbackLng, supportedLngs } from '~/i18n.config';
import * as translations from '~/i18n';

type Translations = {
  [locale: string]: {
    [namespace: string]: {
      [key: string]: string;
    };
  };
};
class InMemoryBackend implements Backend {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly data: Translations) {}

  getTranslations(namespace: string, locale: string) {
    return (
      this.data?.[locale]?.[namespace] || this.data[fallbackLng][namespace]
    );
  }
}

export const i18n = new RemixI18Next(
  new InMemoryBackend(translations as Translations),
  {
    fallbackLng,
    supportedLanguages: supportedLngs
  }
);
