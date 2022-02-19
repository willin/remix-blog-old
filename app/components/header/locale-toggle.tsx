import { useEffect, useState } from 'react';
import { useLocation } from 'remix';
import { getLocale, languages } from '~/i18n';

export function LocaleToggle() {
  const location = useLocation();
  const [path, setPath] = useState(
    location.pathname.replace(`/${getLocale(location.pathname)}`, '')
  );
  useEffect(() => {
    setPath(location.pathname.replace(`/${getLocale(location.pathname)}`, ''));
  }, [location]);

  return (
    <div className='dropdown dropdown-end dropdown-hover'>
      <div className='m-1 btn'>
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129'
          />
        </svg>
      </div>
      <div className='shadow dropdown-content bg-neutral-focus rounded-box w-104 flex'>
        <div className='menu w-52'>
          <ul>
            {Object.entries(languages).map(([locale, text]) => (
              <li key={locale}>
                <a href={`/${locale}${path}`}>{text}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
