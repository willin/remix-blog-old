import { Octokit } from '@octokit/rest';
import { throttling } from '@octokit/plugin-throttling';

const OctokitWithThrottling = Octokit.plugin(throttling);

type ThrottleOptions = {
  method: string;
  url: string;
  request: { retryCount: number };
};

const repo = {
  owner: 'willin',
  repo: 'willin.wang'
};

export class Github {
  private octokit: Octokit;

  constructor(token: string) {
    this.octokit = new OctokitWithThrottling({
      auth: token,
      throttle: {
        onRateLimit: (retryAfter: number, options: ThrottleOptions) => {
          console.warn(
            `Request quota exhausted for request ${options.method} ${options.url}. Retrying after ${retryAfter} seconds.`
          );

          return true;
        },
        onAbuseLimit: (retryAfter: number, options: ThrottleOptions) => {
          // does not retry, only logs a warning
          // eslint-disable-next-line
          octokit.log.warn(
            `Abuse detected for request ${options.method} ${options.url}`
          );
        }
      }
    });
  }

  async downloadDirList(path: string) {
    const resp = await this.octokit.repos.getContent({
      ...repo,
      path
    });
    const { data } = resp;

    if (!Array.isArray(data)) {
      throw new Error(
        `Tried to download content from ${path}. GitHub did not return an array of files. This should never happen...`
      );
    }

    return data;
  }
}
