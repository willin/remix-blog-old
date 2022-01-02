/* eslint-disable */
export async function onRequest(context) {
  context.data.timestamp = Date.now();
  const res = await context.next().catch((e) => {
    return new Response(e, { status: 500 });
  });
  const delta = Date.now() - context.data.timestamp;
  res.headers.set('x-response-timing', delta);
  return res;
}
