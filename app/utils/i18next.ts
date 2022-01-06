import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// i18n config
export const fallbackLng = 'en';
// Fetch from https://api.github.com/repos/willin/willin.wang/contents/content/i18n?ref=main
export const supportedLngs = ['en', 'zh'];

export function init() {
  return i18next.use(initReactI18next).init({
    fallbackLng,
    supportedLngs,
    keySeparator: false,
    nsSeparator: false,
    defaultNS: 'common',
    react: { useSuspense: false }
  });
}
