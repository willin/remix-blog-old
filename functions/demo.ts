export const onRequestGet = async () => {
  const total = await (VIEWS as KVNamespace).get('total').catch((e) => e);
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
