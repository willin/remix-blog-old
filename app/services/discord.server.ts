import { DISCORD_IDE, DISCORD_UID } from '~/config';

type LanyardActivity = {
  timestamps: {
    starts: number;
  };
  // 'Visual Studio Code'
  name: string;
  // Workspace: willin.wang
  state?: string;
  // Idling
  // Editing tags.tsx
  details: string;
  assets: {
    // Idling
    // Editing a TSX file
    large_text: string;
  };
};

type LanyardData = {
  success: boolean;
  data: {
    discord_status: 'online' | 'offline';
    activities?: LanyardActivity[];
  };
};

export type DiscordStats = {
  online: boolean;
  coding: boolean;
  ide?: {
    project: string;
  };
};

export const getDiscordUser = async (): Promise<DiscordStats> => {
  const API = `https://api.lanyard.rest/v1/users/${DISCORD_UID}`;
  const res = await fetch(API);
  const json = await res.json<LanyardData>();
  if (!json.success) {
    throw new Error('Failed to get user data from Lanyard');
  }
  const { data } = json;
  const { activities = [] } = data;
  const vscode = activities.find((x) => x.name === DISCORD_IDE);
  const coding = !!vscode;
  const ide = {};
  if (coding) {
    const project =
      !vscode.assets || vscode.state === 'Idling'
        ? 'UNKNOWN'
        : (vscode.state || '').replace('Workspace: ', '');

    const matchedFile = vscode.details.match(/\s(.+)$/);
    const file = matchedFile ? matchedFile[1] : 'UNKNOWN';

    const matchedType = vscode.assets.large_text.match(/\s([^\s]+)\sfile/);
    const type = matchedType ? matchedType[1] : 'UNKNOWN';

    Object.assign(ide, { project, file, type });
  }
  return {
    online: data.discord_status === 'online',
    coding,
    ide
  };
};
