import ThemeToggle from '~/components/navbar/theme-toggle';

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix</h1>
      <ThemeToggle />

      <div className='card glass lg:card-side'>
        <figure className='p-6'>
          <img src='https://picsum.photos/id/1005/300/200' className='rounded-lg shadow-lg' />
        </figure>
        <div className='max-w-md card-body'>
          <h2 className='card-title'>Glass</h2>
          <p>
            Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit sit necessitatibus veritatis sed
            molestiae voluptates incidunt iure sapiente.
          </p>
          <div className='card-actions'>
            <button className='btn glass rounded-full'>Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
}
