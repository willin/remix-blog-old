import { json, type LoaderFunction } from 'remix';
import { locales } from '~/i18n';

export const loader: LoaderFunction = () =>
  json({
    locales
  });
