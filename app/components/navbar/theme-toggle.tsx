import { useState, useEffect } from 'react';
import { useTheme, Theme } from 'remix-themes';
import { MoonIcon, SunIcon } from './svg';

export const useLoaded = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);
  return loaded;
};

export default function ThemeToggle() {
  const [theme, setTheme] = useTheme();
  const loaded = useLoaded();

  return (
    <button
      aria-label='Toggle Theme'
      type='button'
      title='Toggle Theme'
      onClick={() => setTheme(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK)}>
      {theme === Theme.DARK && loaded && <SunIcon />}
      {theme === Theme.LIGHT && loaded && <MoonIcon />}
    </button>
  );
}
