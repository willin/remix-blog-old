import { useRef } from 'react';
import { motion, useCycle } from 'framer-motion';
import { useDimensions } from '~/hooks/use-dimensions';
import { LocaleToggle } from './locale-toggle';
import { LocaleNavigation } from './locale-navigation';
import { ThemeToggle } from './theme-toggle';

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at calc(100% - 40px) 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: 'circle(30px at calc(100% - 40px) 40px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40
    }
  }
};

export default function Drawer() {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <motion.nav
      className='fixed inset-y-0 right-0 w-72'
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      custom={height}
      ref={containerRef}>
      <motion.div
        className='fixed inset-y-0 right-0 w-72 bg-neutral backdrop-blur'
        variants={sidebar}
      />
      <ThemeToggle />
      <LocaleToggle toggle={() => toggleOpen()} />
      <LocaleNavigation />
    </motion.nav>
  );
}
