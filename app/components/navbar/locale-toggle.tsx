import * as React from 'react';
import { motion } from 'framer-motion';

const Path = (props) => (
  <motion.path
    fill='transparent'
    strokeWidth='3'
    stroke='currentColor'
    strokeLinecap='round'
    {...props}
  />
);

export const LocaleToggle = ({ toggle }: { toggle: () => void }) => (
  <button
    onClick={toggle}
    className='absolute right-[23px] top-[23px]'
    aria-label='Change Language'
    title='Change Language'>
    <svg width='32px' height='32px' viewBox='0 0 23 23'>
      <Path
        variants={{
          closed: {
            d: 'M5 15v2a2 2 0 0 0 1.85 1.995L7 19h3v2H7a4 4 0 0 1-4-4v-2h2zm13-5l4.4 11h-2.155l-1.201-3h-4.09l-1.199 3h-2.154L16 10h2zm-1 2.885L15.753 16h2.492L17 12.885zM8 2v2h4v7H8v3H6v-3H2V4h4V2h2zm9 1a4 4 0 0 1 4 4v2h-2V7a2 2 0 0 0-2-2h-3V3h3zM6 6H4v3h2V6zm4 0H8v3h2V6z',
            strokeWidth: 1
          },
          open: { d: 'M 3 16.5 L 17 2.5', strokeWidth: 3 }
        }}
      />

      <Path
        d='M 3 2.5 L 17 16.346'
        variants={{
          closed: { opacity: 0 },
          open: { opacity: 1 }
        }}
      />
    </svg>
  </button>
);
