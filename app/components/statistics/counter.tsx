import { animate } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

export function Counter({ from, to }: { from: number; to: number }) {
  const nodeRef = useRef();

  useEffect(() => {
    const node = nodeRef.current;

    const controls = animate<number>(from || 0, to, {
      duration: 1,
      onUpdate(value) {
        node.textContent = parseInt(value, 10);
      }
    });

    return () => controls.stop();
  }, [from, to]);

  return <p ref={nodeRef} />;
}
