import { CSDN, Juejin, SegmentFault, Zhihu } from './others/svg';

export function Footer() {
  return (
    <footer className='px-10 py-4 border-t footer bg-base-200 text-base-content border-base-300 opacity-90'>
      <div className='items-center grid-flow-col'>
        <svg
          viewBox='0 0 512 512'
          xmlns='http://www.w3.org/2000/svg'
          width='32'
          height='32'
          className='fill-current'>
          <circle
            cx='256'
            cy='256'
            r='220'
            style={{
              strokeWidth: '32px',
              stroke: 'currentColor',
              fill: 'none'
            }}
          />
          <path d='M 257.366 65.784 L 257.366 446.234 C 247.816 445.374 238.366 445.124 229.126 443.534 C 218.666 441.734 208.426 438.654 198.056 436.294 C 194.856 435.564 193.526 433.694 192.626 430.674 C 184.006 401.834 175.32 373.011 166.566 344.204 C 166.056 342.514 165.426 340.854 164.486 338.114 L 133.886 400.114 C 93.216 363.854 70.496 319.114 67.966 265.114 C 65.176 205.634 86.896 155.714 131.176 115.274 L 131.176 273.274 L 132.326 273.714 L 164.566 236.884 L 193.956 304.274 L 195.146 304.064 L 195.146 298.304 C 195.146 226.304 195.11 154.304 195.036 82.304 C 195.036 77.714 196.216 75.684 200.776 74.304 C 219.137 68.78 238.193 65.911 257.366 65.784 Z' />
          <path d='M 348.903 238.435 C 338.903 261.355 329.393 283.255 319.853 305.145 L 319.213 304.995 L 319.213 77.315 C 325.313 79.855 331.213 82.075 336.873 84.705 C 352.455 91.91 366.933 101.294 379.873 112.575 C 381.518 114.051 382.544 116.094 382.743 118.295 C 382.89 170.295 382.923 222.295 382.843 274.295 C 382.843 274.765 382.723 275.295 382.493 276.935 Z' />
          <path d='M 320.519 434.238 L 349.729 337.878 C 350.487 338.942 351.192 340.043 351.839 341.178 C 360.832 359.371 369.812 377.571 378.779 395.778 C 379.779 397.778 380.779 399.388 378.389 401.388 C 361.156 415.619 341.572 426.736 320.519 434.238 Z' />
        </svg>
        <p>
          Willin Wang <small>&copy; 2002 ~ {new Date().getFullYear()}</small>
          <br />
          <small>
            Made with ❤️ and{' '}
            <a
              href='http://remix.run'
              target='_blank'
              rel='noopener noreferrer'>
              Remix
            </a>
          </small>
        </p>
      </div>
      <div className='md:place-self-center md:justify-self-end'>
        <div className='grid grid-flow-col gap-4'>
          <a
            href='https://segmentfault.com/u/willin'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='SegmentFault'>
            <SegmentFault />
          </a>

          <a
            href='https://blog.csdn.net/jslygwx?type=blog'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='CSDN'>
            <CSDN />
          </a>
          <a
            href='https://www.zhihu.com/people/willin'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='知乎'>
            <Zhihu />
          </a>

          <a
            href='https://juejin.cn/user/1873223546052391'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='掘金'>
            <Juejin />
          </a>

          <a
            href='https://github.com/willin'
            target='_blank'
            aria-label='Github'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 512 512'
              className='inline-block w-6 h-6 fill-current'>
              <path d='M256,32C132.3,32,32,134.9,32,261.7c0,101.5,64.2,187.5,153.2,217.9a17.56,17.56,0,0,0,3.8.4c8.3,0,11.5-6.1,11.5-11.4,0-5.5-.2-19.9-.3-39.1a102.4,102.4,0,0,1-22.6,2.7c-43.1,0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1,1.4-14.1h.1c22.5,2,34.3,23.8,34.3,23.8,11.2,19.6,26.2,25.1,39.6,25.1a63,63,0,0,0,25.6-6c2-14.8,7.8-24.9,14.2-30.7-49.7-5.8-102-25.5-102-113.5,0-25.1,8.7-45.6,23-61.6-2.3-5.8-10-29.2,2.2-60.8a18.64,18.64,0,0,1,5-.5c8.1,0,26.4,3.1,56.6,24.1a208.21,208.21,0,0,1,112.2,0c30.2-21,48.5-24.1,56.6-24.1a18.64,18.64,0,0,1,5,.5c12.2,31.6,4.5,55,2.2,60.8,14.3,16.1,23,36.6,23,61.6,0,88.2-52.4,107.6-102.3,113.3,8,7.1,15.2,21.1,15.2,42.5,0,30.7-.3,55.5-.3,63,0,5.4,3.1,11.5,11.4,11.5a19.35,19.35,0,0,0,4-.4C415.9,449.2,480,363.1,480,261.7,480,134.9,379.7,32,256,32Z'></path>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
