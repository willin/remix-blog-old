/* eslint-disable */
const env = NODE_ENV as string;

export async function onRequest(context) {
  context.data.timestamp = Date.now();
  const res = await context.next().catch((e) => {
    return new Response(env === 'preview' ? e : 'Opps!', { status: 500 });
  });
  const delta = Date.now() - context.data.timestamp;
  res.headers.set('x-response-timing', delta);
  return res;
}
