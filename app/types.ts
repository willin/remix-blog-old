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
