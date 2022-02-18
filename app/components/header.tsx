import { Navbar } from './header/navbar';

export function Header() {
  return (
    <header className='fixed w-full z-20 opacity-90 hover:opacity-100'>
      <Navbar />
    </header>
  );
}
