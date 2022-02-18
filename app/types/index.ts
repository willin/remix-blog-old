export * from './github';

export type LoaderFunctionArgs = {
  request: Request;
  params: Params;
  context: EventContext<
    {
      NODE_ENV?: string;
      STATISTICS: KVNamespace;
    },
    string,
    any
  >;
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
