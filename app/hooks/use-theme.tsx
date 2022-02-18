import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';

export const THEMES = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'Emerald',
  'Corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'Wireframe',
  'black',
  'luxury',
  'dracula',
  'CMYK'
];

export const THEME_ICONS = [
  '🌝',
  '🌚',
  '🧁',
  '🐝',
  '✳️',
  '🏢',
  '🌃',
  '👴',
  '🤖',
  '🌸',
  '🎃',
  '🌷',
  '🌲',
  '🐟',
  '👓',
  '🖍',
  '🧚‍♀️',
  '📝',
  '🏴',
  '💎',
  '🧛‍♂️',
  '🖨'
].reduce((acc, curr, index) => {
  acc[THEMES[index]] = curr;
  return acc;
}, {});

export const THEMES_DARK = [
  'dark',
  'bumblebee',
  'Corporate',
  'cyberpunk',
  'retro',
  'pastel',
  'black',
  'luxury',
  'dracula',
  'CMYK',
  'synthwave'
];

const darkThemes = new Set(THEMES_DARK);
export const THEMES_LIGHT = THEMES.filter((t) => !darkThemes.has(t));

type ThemeContextType = [
  string | null,
  React.Dispatch<React.SetStateAction<string | null>>
];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

ThemeContext.displayName = 'ThemeContext';

const prefersLightMQ = '(prefers-color-scheme: light)';

export function ThemeProvider({
  children,
  themeAction = '/api/theme',
  specifiedTheme
}: {
  children: ReactNode;
  themeAction: string;
  specifiedTheme: string | null;
}) {
  const [theme, setTheme] = useState<string | null>(() => {
    if (specifiedTheme) {
      return THEMES.includes(specifiedTheme) ? specifiedTheme : null;
    }

    if (typeof window !== 'object') return null;
    return window.matchMedia(prefersLightMQ).matches ? 'valentine' : 'retro';
  });

  const mountRun = React.useRef(false);

  useEffect(() => {
    if (!mountRun.current) {
      mountRun.current = true;
      return;
    }
    if (!theme) return;

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetch(`${themeAction}`, {
      method: 'POST',
      body: JSON.stringify({ theme })
    });
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(prefersLightMQ);
    const handleChange = () => {
      setTheme(mediaQuery.matches ? 'valentine' : 'retro');
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
