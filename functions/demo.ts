export const onRequestGet = async ({ env }: EventContext) => {
  const total = await (env.VIEWS as KVNamespace).get('total').catch((e) => e);
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
