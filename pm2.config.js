module.exports = {
  apps: [
    {
      name: 'Prisma',
      script: 'prisma generate',
      watch: ['./prisma'],
      autorestart: false,
      env: {
        NODE_ENV: process.env.NODE_ENV ?? 'development',
        PRISMA_CLIENT_ENGINE_TYPE: 'dataproxy'
      }
    },
    {
      name: 'Tailwind CSS',
      script: 'postcss styles/**/*.css --base styles --dir app/styles --w',
      autorestart: false,
      ignore_watch: ['.']
    },
    {
      name: 'Remix',
      script: 'remix watch',
      autorestart: false,
      ignore_watch: ['.']
    },
    {
      name: 'Cloudflare Wrangler',
      script: 'wrangler pages dev ./public --kv STATISTICS',
      autorestart: false,
      ignore_watch: ['.'],
      env: {
        NODE_ENV: process.env.NODE_ENV ?? 'development',
        BROWSER: 'none',
        DATABASE_URL: process.env.DATABASE_URL
      }
    }
  ]
};
