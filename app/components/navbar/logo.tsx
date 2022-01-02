import { motion } from 'framer-motion';
import { Link } from 'remix';

export default function Logo() {
  return (
    <>
      <Link to='/'>
        <h1 className='text-black dark:text-white group-hover:drop-shadow-black dark:group-hover:drop-shadow-white'>
          Willin Wang
        </h1>
        <motion.svg className='drop-shadow-black dark:drop-shadow-white group-hover:play-pause' viewBox='0 0 512 512'>
          <style>
            {` @keyframes flicker {
      0%    { opacity: 1; }
      3%    { opacity: 0.4; }
      6%    { opacity: 1; }
      7%    { opacity: 0.4; }
      8%    { opacity: 1; }
      9%    { opacity: 0.4; }
      10%   { opacity: 1; }
      89%   { opacity: 1; }
      90%   { opacity: 0.4; }
      100%  { opacity: 0.4; }
    }

    #w  { animation: flicker 6s infinite step-end; }
    #i { animation: flicker 4s infinite 5s step-end; }
    #v { animation: flicker 5s infinite 3s ease-in-out; }`}
          </style>
          <motion.path
            className='circle stroke-black dark:stroke-white'
            d='M36,256a220,220 0 1,0 440,0a220,220 0 1,0 -440,0'></motion.path>
          <motion.path
            id='w'
            className='neon fill-black dark:fill-white'
            d='M 257.366 65.784 L 257.366 446.234 C 247.816 445.374 238.366 445.124 229.126 443.534 C 218.666 441.734 208.426 438.654 198.056 436.294 C 194.856 435.564 193.526 433.694 192.626 430.674 C 184.006 401.834 175.32 373.011 166.566 344.204 C 166.056 342.514 165.426 340.854 164.486 338.114 L 133.886 400.114 C 93.216 363.854 70.496 319.114 67.966 265.114 C 65.176 205.634 86.896 155.714 131.176 115.274 L 131.176 273.274 L 132.326 273.714 L 164.566 236.884 L 193.956 304.274 L 195.146 304.064 L 195.146 298.304 C 195.146 226.304 195.11 154.304 195.036 82.304 C 195.036 77.714 196.216 75.684 200.776 74.304 C 219.137 68.78 238.193 65.911 257.366 65.784 Z'
          />
          <motion.path
            id='v'
            className='fill-black dark:fill-white'
            d='M 348.903 238.435 C 338.903 261.355 329.393 283.255 319.853 305.145 L 319.213 304.995 L 319.213 77.315 C 325.313 79.855 331.213 82.075 336.873 84.705 C 352.455 91.91 366.933 101.294 379.873 112.575 C 381.518 114.051 382.544 116.094 382.743 118.295 C 382.89 170.295 382.923 222.295 382.843 274.295 C 382.843 274.765 382.723 275.295 382.493 276.935 Z'
          />
          <motion.path
            id='i'
            className='fill-black dark:fill-white'
            d='M 320.519 434.238 L 349.729 337.878 C 350.487 338.942 351.192 340.043 351.839 341.178 C 360.832 359.371 369.812 377.571 378.779 395.778 C 379.779 397.778 380.779 399.388 378.389 401.388 C 361.156 415.619 341.572 426.736 320.519 434.238 Z'
          />
        </motion.svg>
      </Link>
    </>
  );
}
