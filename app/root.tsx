import { Outlet } from 'remix';
import type { LinksFunction } from 'remix';
import tailwindStyles from '~/styles/global.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: tailwindStyles },
  { rel: 'shortcut icon', type: 'image/jpg', href: '/favicon.png' }
];

export default function App() {
  return <Outlet />;
}
