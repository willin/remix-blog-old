import { DiscordStats } from '~/types';
import { fetcher } from '~/services/content.server';

const DISCORD_UID = '411070156253429760';
const DISCORD_IDE = 'Visual Studio Code';

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

export const getDiscordUser = async (
  kv: KVNamespace
): Promise<DiscordStats> => {
  const key = '$$discord';
  const cache = await kv.get<DiscordStats>(key, 'json');
  if (cache) {
    return cache;
  }
  const API = `https://api.lanyard.rest/v1/users/${DISCORD_UID}`;
  const json = await fetcher<LanyardData>(API);
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
  await kv.put(
    key,
    JSON.stringify({
      online: data.discord_status === 'online',
      coding,
      ide
    }),
    {
      expirationTtl: 300
    }
  );
  return {
    online: data.discord_status === 'online',
    coding,
    ide
  };
};
