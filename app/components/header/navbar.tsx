import { Link } from 'remix';
import { useI18n } from 'remix-i18n';
import { RouteLink } from './route-link';
import { ThemeToggle } from './theme-toggle';

export function Navbar() {
  const i18n = useI18n();
  const { t } = i18n;

  return (
    <div className='navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box'>
      <div className='px-2 mx-2 navbar-start'>
        <Link to='/'>
          <span className='text-lg font-bold'>Willin Wang</span>
        </Link>
      </div>
      <div className='hidden px-2 mx-2 navbar-center lg:flex'>
        <div className='flex items-stretch'>
          <RouteLink to='/'>{t('nav.home')}</RouteLink>
          <RouteLink to='/posts'>Posts</RouteLink>
          <RouteLink to='/projects'>Projects</RouteLink>
          <RouteLink to='/about'>About</RouteLink>
          <RouteLink to='/roadmap'>Roadmap</RouteLink>
        </div>
      </div>
      <div className='navbar-end'>
        <ThemeToggle></ThemeToggle>
      </div>
    </div>
  );
}
