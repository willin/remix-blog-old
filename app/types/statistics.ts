import { GithubStats } from './github';

export type DiscordStats = {
  online: boolean;
  coding: boolean;
  ide?: {
    project: string;
    file: string;
    type: string;
  };
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
