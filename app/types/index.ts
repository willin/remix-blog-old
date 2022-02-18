export * from './github';
export * from './statistics';

export type LoaderFunctionArgs = {
  request: Request;
  params: Params;
  context: EventContext<any, string, any> & {
    NODE_ENV?: string;
    STATISTICS: KVNamespace;
  };
};

export type WFrontMatter = {
  type: string;
  slug: string;
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

export type WContent = {
  frontmatter: WFrontMatter;
  html: string;
  code?: string;
};

export type WMeta = {
  words: number;
  posts: WFrontMatter[];
  tags: [string, number][];
};
