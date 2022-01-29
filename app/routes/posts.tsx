import { Outlet } from 'remix';

export default function Posts() {
  return (
    <>
      <main className='mx-8'>
        <Outlet />
      </main>
      {/* <aside>sidebar</aside> */}
    </>
  );
}
