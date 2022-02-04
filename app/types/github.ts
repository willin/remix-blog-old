// https://docs.github.com/en/developers/webhooks-and-events/events/github-event-types
export enum GithubEventType {
  // 在提交中发表评论
  CommitCommentEvent = 'CommitCommentEvent',
  // 创建分支或 Tag
  CreateEvent = 'CreateEvent',
  // 删除分支或者 Tag
  DeleteEvent = 'DeleteEvent',
  // Fork 一个仓库
  ForkEvent = 'ForkEvent',
  // 创建或编辑 Wiki
  GollumEvent = 'GollumEvent',
  // 在 Issue 中发表评论
  IssueCommentEvent = 'IssueCommentEvent',
  // 创建或编辑 Issue
  IssuesEvent = 'IssuesEvent',
  // 协作者事件，忽略
  // MemberEvent = 'MemberEvent',
  // 私有存储库公开
  // When a private repository is made public. Without a doubt: the best GitHub event.
  PublicEvent = 'PublicEvent',
  // 创建或编辑 Pull Request
  PullRequestEvent = 'PullRequestEvent',
  // 代码评审
  PullRequestReviewEvent = 'PullRequestReviewEvent',
  // 代码评审中发表评论
  PullRequestReviewCommentEvent = 'PullRequestReviewCommentEvent',
  // 提交代码
  PushEvent = 'PushEvent',
  // 发布版本
  ReleaseEvent = 'ReleaseEvent',
  // 赞助成员
  SponsorshipEvent = 'SponsorshipEvent',
  // 关注项目
  WatchEvent = 'WatchEvent'
}

export type GithubEvent = {
  id: string;
  type: GithubEventType;
  created_at: string;
  repo: {
    name: string;
  };
  payload: {
    action: string;
    // Issue Event
    issue: {
      number: number;
      html_url: string;
    };
    // comment
    comment: {
      html_url: string;
    };
    // Push Event
    head: string;
    // PR
    pull_request: {
      number: number;
      html_url: string;
    };
    // PR Review Event
    review: {
      html_url: string;
    };
    // Create/Delete 分支名
    ref: string;
    // tag/branch
    ref_type: 'branch' | 'tag';
  };
};

export type GithubStats = {
  followers: number;
  stars: number;
  languages: string[];
  topics: string[];
  events: GithubEvent[];
};
