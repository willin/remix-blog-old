import { GithubJob } from './github.mjs';
import { NpmJob } from './npm.mjs';
import { WakatimeJob } from './wakatime.mjs';

async function triggerEvent(event) {
  switch (event.cron) {
    // every hour
    case '0 */1 * * *': {
      await GithubJob();
      break;
    }
    // twice a day
    case '10 */12 * * *': {
      await NpmJob();
      break;
    }
    case '50 */12 * * *': {
      await WakatimeJob();
      break;
    }
    default: {
      await GithubJob();
      await NpmJob();
      await WakatimeJob();
      break;
    }
  }
  console.log('cron processed');
}

// eslint-disable-next-line no-restricted-globals, no-undef
addEventListener('scheduled', (event) => {
  event.waitUntil(triggerEvent(event));
});
