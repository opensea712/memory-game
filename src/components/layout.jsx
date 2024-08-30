import Footer from './footer';
import Header from './header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div
      className='relative flex size-full min-h-screen flex-col bg-[#111a22] dark group/design-root overflow-x-hidden'
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <div className='layout-container flex h-full grow flex-col'>
        <Header />
        <main className='relative px-40 flex flex-1 justify-center py-5'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
