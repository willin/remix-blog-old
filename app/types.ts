export type LoaderFunctionArgs = {
  request: Request;
  params: Params;
  context: EventContext<
    {
      NODE_ENV?: string;
      API_KEY: string;
      VIEWS: KVNamespace;
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
