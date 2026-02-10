import { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState("int");

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`max-h-screen bg-white  pr-5 ${(sidebarOpen !=='int' && !sidebarOpen)?"pl-5":"pl-5"}`}>
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <Sidebar sidebarOpen={sidebarOpen} />
        <main className={`${sidebarOpen ? 'lg:ml-[261px]' : 'lg:ml-0'} transition-all duration-500 ease-in-out h-full max-h-full bg-[#eef2f6] rounded-sm flex-1 p-4  overflow-hidden w-full lg:w-auto`}>
          {children}
        </main>
    </div>
  );
};

export default Layout;

