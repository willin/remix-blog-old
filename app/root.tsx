import { Outlet } from 'remix';
import type { LinksFunction, LoaderFunction } from 'remix';
import tailwindStyles from '~/styles/global.css';
import { themeSessionResolver } from '~/services/theme.server';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: tailwindStyles },
  { rel: 'shortcut icon', type: 'image/jpg', href: '/favicon.png' }
];

export const loader: LoaderFunction = async ({ request }) => {
  const { getTheme } = await themeSessionResolver(request);
  return {
    theme: getTheme()
  };
};

export default function App() {
  return <Outlet />;
}
