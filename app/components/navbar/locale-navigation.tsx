import { motion } from 'framer-motion';

const itemIds = [0, 1, 2, 3, 4];

const MenuItem = () => (
  <motion.li
    className='flex mb-[20px] items-center cursor-pointer'
    variants={{
      open: {
        y: 20,
        opacity: 1,
        transition: {
          y: { stiffness: 1000, velocity: -100 }
        }
      },
      closed: {
        y: 50,
        opacity: 0,
        transition: {
          y: { stiffness: 1000 }
        }
      }
    }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}>
    <a>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        className='inline-block w-5 h-5 mr-2 stroke-current'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'></path>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'></path>
      </svg>
      Item with icon
    </a>
  </motion.li>
);

export const LocaleNavigation = () => (
  <motion.ul
    className='absolute top-[100px] w-full px-8'
    variants={{
      open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.2 }
      },
      closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 }
      }
    }}>
    {itemIds.map((i) => (
      <MenuItem i={i} key={i} />
    ))}
  </motion.ul>
);
