import { type ReactNode, useState } from 'react';
import { useTheme } from './theme';

export function ErrorLayout({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useTheme();
  useState(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = window?.localStorage.getItem('theme') ?? '';
      if (storedTheme) setTheme(storedTheme);
    }
  }, [theme]);

  return <div>{children}</div>;
}
