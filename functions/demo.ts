export const onRequestGet: PagesFunction<{
  VIEWS: KVNamespace;
}> = async ({ env }) => {
  const total = await env.VIEWS.get('total');
  const data = {
    hello: 'world',
    total
  };
  const json = JSON.stringify(data, null, 2);

  return new Response(json, {
    headers: {
      'content-type': 'application/json;charset=UTF-8'
    }
  });
};
