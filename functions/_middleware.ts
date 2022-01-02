export async function onRequest(context) {
  context.data.timestamp = Date.now();
  const res = await context.next().catch((e) => {
    console.error(e);
    return new Response('Oops!', { status: 500 });
  });
  const delta = Date.now() - context.data.timestamp;
  res.headers.set('x-response-timing', delta);
  return res;
}
