import { DiscordStats } from '~/services/discord.server';
import { GithubStats } from './github';

export * from './github';

export type LoaderFunctionArgs = {
  request: Request;
  params: Params;
  context: EventContext<
    {
      NODE_ENV?: string;
      API_KEY: string;
      STATISTICS: KVNamespace;
      CONTENTS: KVNamespace;
    },
    string,
    any
  >;
};

export type WFrontMatter = {
  title: string;
  date: string;
  tags?: string[];
  year?: number;
  image?: string;
  description?: string;
  readingTime?: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
};

export type WPost = {
  slug: string;
  hash: string;
  frontmatter: WFrontMatter;
  type?: string;
  locale?: string | boolean;
  deleted?: boolean;
  html?: string;
  code?: string;
};

export type NpmStats = {
  sum: number;
  stats: [string, number][];
};

export type WakatimeStats = {
  cummulative_total: {
    decimal: string;
  };
};

export type AllStatistics = {
  discord: DiscordStats;
  github: GithubStats;
  npm: NpmStats;
  wakatime: WakatimeStats;
};
