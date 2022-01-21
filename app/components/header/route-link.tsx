import { NavLink, type NavLinkProps } from 'remix';
import clsx from 'classnames';

export function RouteLink({
  children,
  to
}: Pick<NavLinkProps, 'children' | 'to'>) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx(isActive ? 'glass' : 'btn-ghost', 'btn btn-sm rounded-btn')
      }>
      {children}
    </NavLink>
  );
}
