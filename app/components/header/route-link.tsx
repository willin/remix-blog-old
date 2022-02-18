import { type NavLinkProps } from 'remix';
import clsx from 'classnames';
import { LocaleNavLink } from '../atom/locale-link';

export function RouteLink({
  children,
  to
}: Pick<NavLinkProps, 'children' | 'to'>) {
  return LocaleNavLink({
    to,
    className: ({ isActive }) =>
      clsx(isActive ? 'glass' : 'btn-ghost', 'btn btn-sm rounded-btn'),
    children
  });
}
