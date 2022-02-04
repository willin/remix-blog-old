import { get } from './fetch.mjs';

export async function WakatimeJob() {
  const startDate = new Date(new Date() - 7 * 86400 * 1000)
    .toJSON()
    .slice(0, 10);
  const endDate = new Date().toJSON().slice(0, 10);
  const statistics = await get(
    `https://wakatime.com/api/v1/users/${WAKATIME_ID}/summaries?start=${startDate}&end=${endDate}&api_key=${WAKATIME_API_KEY}`
  );
  console.log('Wakatime data');
  await STATISTICS.put('$$wakatime', JSON.stringify(statistics));
}
