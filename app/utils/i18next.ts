import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { fallbackLng, supportedLngs } from '~/i18n.config';

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
