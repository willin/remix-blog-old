import { get } from './fetch.mjs';

export async function NpmJob() {
  const stats = await get(
    'https://raw.githubusercontent.com/wshow/github-readme-npm-downloads/main/npm.json'
  );
  console.log(`NPM data: packages > ${stats.stats.length}`);
  await STATISTICS.put('$$npm', JSON.stringify(stats));
}
