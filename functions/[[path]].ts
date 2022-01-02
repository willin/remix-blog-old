import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as build from '../build';

const handleRequest = createPagesFunctionHandler({
  build
});

export const onRequest: PagesFunction = (context) => handleRequest(context);
