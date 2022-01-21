module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    '@fullhuman/postcss-purgecss': {
      content: [
        './app/**/*.{js,jsx,ts,tsx}',
        //
        './content/**/*.{js,jsx,ts,tsx,mdx}'
      ],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
      safelist: ['html', 'body', /data-theme$/]
    }
  }
};
