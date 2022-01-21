import { THEMES, THEME_ICONS } from '~/config';
import { useTheme } from '~/layout/theme';

export function ThemeToggle() {
  const [theme, setTheme] = useTheme();
  const onThemeClicked = (theme: string) => {
    setTheme(theme);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetch('/action/set-theme', {
      method: 'PUT',
      body: JSON.stringify({ theme })
    });
  };

  return (
    <div className='dropdown dropdown-end'>
      <div tabIndex='0' className='m-1 btn'>
        {theme}
      </div>
      <ul
        tabIndex='0'
        className='p-2 shadow menu dropdown-content bg-neutral rounded-box w-52'>
        {THEMES.map((t, i) => (
          <li key={t}>
            <a onClick={onThemeClicked.bind(this, t.toLowerCase())}>
              {THEME_ICONS[i]} {t}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
