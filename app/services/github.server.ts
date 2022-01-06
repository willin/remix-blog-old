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

  /**
   *
   * @param path the full path to list
   * @returns a promise that resolves to a file ListItem of the files/directories in the given directory (not recursive)
   */
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

  /**
   *
   * @param sha the hash for the file (retrieved via `downloadDirList`)
   * @returns a promise that resolves to a string of the contents of the file
   */
  async downloadFileBySha(sha: string) {
    const { data } = await this.octokit.request(
      'GET /repos/{owner}/{repo}/git/blobs/{file_sha}',
      {
        ...repo,
        file_sha: sha
      }
    );
    //                                lol
    const encoding = data.encoding as Parameters<typeof Buffer.from>['1'];
    return Buffer.from(data.content, encoding).toString();
  }

  async downloadFile(path: string) {
    const { data } = (await this.octokit.request(
      'GET /repos/{owner}/{repo}/contents/{path}',
      {
        ...repo,
        path
      }
    )) as { data: { content?: string; encoding?: string } };

    if (!data.content || !data.encoding) {
      console.error(data);
      throw new Error(
        `Tried to get ${path} but got back something that was unexpected. It doesn't have a content or encoding property`
      );
    }

    //                                lol
    const encoding = data.encoding as Parameters<typeof Buffer.from>['1'];
    return Buffer.from(data.content, encoding).toString();
  }
}
