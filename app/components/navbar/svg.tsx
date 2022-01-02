import { motion } from 'framer-motion';

const transition = {
  type: 'spring',
  stiffness: 200,
  damping: 10
};

const whileTap = {
  scale: 0.95,
  rotate: 15
};

export const MoonIcon = () => {
  const variants = {
    initial: { scale: 0.6, rotate: 90 },
    animate: { scale: 1, rotate: 0, transition },
    whileTap
  };

  return (
    <motion.svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 50 50' key='moon'>
      <motion.path
        d='M 43.81 29.354 C 43.688 28.958 43.413 28.626 43.046 28.432 C 42.679 28.238 42.251 28.198 41.854 28.321 C 36.161 29.886 30.067 28.272 25.894 24.096 C 21.722 19.92 20.113 13.824 21.683 8.133 C 21.848 7.582 21.697 6.985 21.29 6.578 C 20.884 6.172 20.287 6.022 19.736 6.187 C 10.659 8.728 4.691 17.389 5.55 26.776 C 6.408 36.163 13.847 43.598 23.235 44.451 C 32.622 45.304 41.28 39.332 43.816 30.253 C 43.902 29.96 43.9 29.647 43.81 29.354 Z'
        fill='currentColor'
        initial='initial'
        animate='animate'
        whileTap='whileTap'
        variants={variants}
      />
    </motion.svg>
  );
};

export const SunIcon = () => {
  const raysVariants = {
    initial: { rotate: 45 },
    animate: { rotate: 0, transition }
  };

  const coreVariants = {
    initial: { scale: 1.5 },
    animate: { scale: 1, transition }
  };

  return (
    <motion.svg
      key='sun'
      width='1em'
      height='1em'
      viewBox='0 0 50 50'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      whileTap={whileTap}
      // Centers the rotation anchor point vertically & horizontally
      style={{ originX: '50%', originY: '50%' }}>
      <motion.circle
        cx='25'
        cy='25'
        r='12'
        fill='currentColor'
        initial='initial'
        animate='animate'
        variants={coreVariants}
      />
      <motion.g initial='initial' animate='animate' variants={raysVariants}>
        <circle cx='6.437125' cy='14.2813' r='3.5655' transform='rotate(-60 6.437125 14.2813)' fill='currentColor' />
        <circle cx='6.438125' cy='35.7158' r='3.5655' transform='rotate(-120 6.438125 35.7158)' fill='currentColor' />
        <circle cx='25' cy='46.4335' r='3.5655' fill='currentColor' />
        <circle cx='43.5627' cy='35.7158' r='3.5655' transform='rotate(-60 43.5627 35.7158)' fill='currentColor' />
        <circle cx='43.5627' cy='14.2823' r='3.5655' transform='rotate(-120 43.5627 14.2823)' fill='currentColor' />
        <circle cx='25' cy='3.5655' r='3.5655' fill='currentColor' />
      </motion.g>
    </motion.svg>
  );
};

export const LangIcon = () => {
  const variants = {
    initial: { scale: 0.6, rotate: 90 },
    animate: { scale: 1, rotate: 0, transition },
    whileTap
  };
  return (
    <motion.svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='1em' height='1em'>
      <motion.path
        d='M5 15v2a2 2 0 0 0 1.85 1.995L7 19h3v2H7a4 4 0 0 1-4-4v-2h2zm13-5l4.4 11h-2.155l-1.201-3h-4.09l-1.199 3h-2.154L16 10h2zm-1 2.885L15.753 16h2.492L17 12.885zM8 2v2h4v7H8v3H6v-3H2V4h4V2h2zm9 1a4 4 0 0 1 4 4v2h-2V7a2 2 0 0 0-2-2h-3V3h3zM6 6H4v3h2V6zm4 0H8v3h2V6z'
        fill='currentColor'
        initial='initial'
        animate='animate'
        whileTap='whileTap'
        variants={variants}
      />
    </motion.svg>
  );
};
