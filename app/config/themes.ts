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
  'synthwave',
  'cyberpunk',
  'halloween',
  'forest',
  'aqua',
  'black',
  'luxury',
  'dracula'
];

const darkThemes = new Set(THEMES_DARK);
export const THEMES_LIGHT = THEMES.filter((t) => !darkThemes.has(t));
