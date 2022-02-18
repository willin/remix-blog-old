import { LocaleLink } from './atom/locale-link';
import {
  Github,
  CSDN,
  Juejin,
  SegmentFault,
  WillinLogo,
  Zhihu
} from './others/svg';

export function Footer() {
  return (
    <footer className='p-4 sm:p-6 bg-base-200 text-base-content opacity-90'>
      <div className='md:flex md:justify-between'>
        <div className='mb-6 md:mb-0'>
          <LocaleLink to='/'>
            <WillinLogo size='5em' />
          </LocaleLink>
        </div>
        <div className='grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3'>
          <div>
            <ul>
              <li className='mb-4'>
                <h4 className='text-secondary'>Pages</h4>
              </li>
              <li>
                <LocaleLink to='/about'>About</LocaleLink>
              </li>
              <li>
                <LocaleLink to='/posts'>Posts</LocaleLink>
              </li>
              <li>
                <LocaleLink to='/projects'>Projects</LocaleLink>
              </li>
              <li>
                <LocaleLink to='/roadmap'>Roadmap</LocaleLink>
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li className='mb-4'>
                <h4 className='text-secondary'>Playground</h4>
              </li>
              <li>
                <LocaleLink to='/playground/punycode'>Punycode</LocaleLink>
              </li>
            </ul>
          </div>
          {/* <div>
            <ul>
              <li className='mb-4'>
                <a
                  href='#'
                  target='_blank'
                  className='text-gray-600 hover:underline dark:text-gray-400'>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href='#'
                  target='_blank'
                  className='text-gray-600 hover:underline dark:text-gray-400'>
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
      <hr className='my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8' />
      <div className='sm:flex sm:items-center sm:justify-between'>
        <span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>
          Willin Wang <small>&copy; 2002 ~ {new Date().getFullYear()}.</small>
          <small>
            Made with ❤️ and{' '}
            <a
              href='http://remix.run'
              target='_blank'
              rel='noopener noreferrer'>
              Remix
            </a>
          </small>
        </span>
        <div className='flex mt-4 space-x-6 sm:justify-center sm:mt-0'>
          <a
            href='https://segmentfault.com/u/willin'
            target='_blank'
            className='hover:text-secondary'
            rel='noopener noreferrer'
            aria-label='SegmentFault'>
            <SegmentFault />
          </a>

          <a
            href='https://blog.csdn.net/jslygwx?type=blog'
            target='_blank'
            className='hover:text-secondary'
            rel='noopener noreferrer'
            aria-label='CSDN'>
            <CSDN />
          </a>
          <a
            href='https://www.zhihu.com/people/willin'
            target='_blank'
            className='hover:text-secondary'
            rel='noopener noreferrer'
            aria-label='知乎'>
            <Zhihu />
          </a>

          <a
            href='https://juejin.cn/user/1873223546052391'
            target='_blank'
            className='hover:text-secondary'
            rel='noopener noreferrer'
            aria-label='掘金'>
            <Juejin />
          </a>

          <a
            href='https://github.com/willin'
            target='_blank'
            className='hover:text-secondary'
            aria-label='Github'>
            <Github />
          </a>
        </div>
      </div>
    </footer>
  );
}
