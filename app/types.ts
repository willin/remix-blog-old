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

export type WPost = {
  type: string;
  slug: string;
  locale: string | boolean;
  deleted: boolean;
  frontmatter: {
    title: string;
    date: string;
    tags?: string[];
    readingTime?: {
      text: string;
      minutes: number;
      time: number;
      words: number;
    };
  };
  hash: string;
  html: string;
  code?: string;
};
