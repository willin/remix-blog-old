import { json, useLoaderData } from 'remix';

export type Params = {
  lang?: string;
};

export const loader = ({ params }) => {
  const { lang = 'cn' } = params as Params;
  return json({ lang });
};

export default function Index() {
  const data = useLoaderData();

  return (
    <main className='pt-8 px-8 w-full mx-auto max-w-screen-2xl'>
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
      <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
        <h1>Welcome to Remix</h1>

        <div className='card glass lg:card-side mb-8'>
          <figure className='p-6'>
            <img
              src='https://picsum.photos/id/1005/300/200'
              className='rounded-lg shadow-lg'
            />
          </figure>
          <div className='max-w-md card-body'>
            <h2 className='card-title'>Glass</h2>
            <p>
              <a href='https://github.com/willin' target='_blank'>
                Willin Wang
              </a>
              Rerum reiciendis beatae tenetur excepturi aut pariatur est eos.
              Sit sit necessitatibus veritatis sed molestiae voluptates incidunt
              iure sapiente.
            </p>
            <div className='card-actions'>
              <button className='btn glass rounded-full'>Get Started</button>
            </div>
          </div>
        </div>

        <div className='card glass lg:card-side mb-8'>
          <figure className='p-6'>
            <img
              src='https://picsum.photos/id/1005/300/200'
              className='rounded-lg shadow-lg'
            />
          </figure>
          <div className='max-w-md card-body'>
            <h2 className='card-title'>Glass</h2>
            <p>
              Rerum reiciendis beatae tenetur excepturi aut pariatur est eos.
              Sit sit necessitatibus veritatis sed molestiae voluptates incidunt
              iure sapiente.
            </p>
            <div className='card-actions'>
              <button className='btn glass rounded-full'>Get Started</button>
            </div>
          </div>
        </div>

        <div className='card glass lg:card-side mb-8'>
          <figure className='p-6'>
            <img
              src='https://picsum.photos/id/1005/300/200'
              className='rounded-lg shadow-lg'
            />
          </figure>
          <div className='max-w-md card-body'>
            <h2 className='card-title'>Glass</h2>
            <p>
              Rerum reiciendis beatae tenetur excepturi aut pariatur est eos.
              Sit sit necessitatibus veritatis sed molestiae voluptates incidunt
              iure sapiente.
            </p>
            <div className='card-actions'>
              <button className='btn glass rounded-full'>Get Started</button>
            </div>
          </div>
        </div>
        <div className='card glass lg:card-side mb-8'>
          <figure className='p-6'>
            <img
              src='https://picsum.photos/id/1005/300/200'
              className='rounded-lg shadow-lg'
            />
          </figure>
          <div className='max-w-md card-body'>
            <h2 className='card-title'>Glass</h2>
            <p>
              Rerum reiciendis beatae tenetur excepturi aut pariatur est eos.
              Sit sit necessitatibus veritatis sed molestiae voluptates incidunt
              iure sapiente.
            </p>
            <div className='card-actions'>
              <button className='btn glass rounded-full'>Get Started</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
