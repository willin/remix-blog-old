import { Link } from 'remix';
import { RouteLink } from './route-link';
import { ThemeToggle } from './theme-toggle';

export function Navbar() {
  return (
    <div className='navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box'>
      <div class='flex-none flex lg:hidden'>
        <button class='btn btn-square btn-ghost'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            class='inline-block w-6 h-6 stroke-current'>
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M4 6h16M4 12h16M4 18h16'></path>
          </svg>
        </button>
      </div>
      <div className='px-2 mx-2 navbar-start'>
        <Link to='/'>
          <span className='text-lg font-bold'>Willin Wang</span>
        </Link>
      </div>
      <div className='hidden px-2 mx-2 navbar-center lg:flex'>
        <div className='flex items-stretch'>
          <RouteLink to='/'>Home</RouteLink>
          <RouteLink to='/blog'>Articles</RouteLink>
          <RouteLink to='/projects'>Projects</RouteLink>
          <RouteLink to='/about'>About</RouteLink>
        </div>
      </div>
      <div className='navbar-end'>
        <ThemeToggle></ThemeToggle>
      </div>
    </div>
  );
}
