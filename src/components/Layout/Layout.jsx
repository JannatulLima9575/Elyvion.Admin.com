import { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
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
    <div className="max-h-screen bg-white  pr-5">
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex relative">
        {sidebarOpen && (
          <>
            {isMobile && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}
            <div className={`max-h-full  fixed  inset-y-0 left-0 z-50 lg:z-auto ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
              <Sidebar />
            </div>
          </>
        )}
        <main className="lg:ml-[280px] h-full max-h-full bg-[#eef2f6] rounded-sm flex-1 p-4 md:p-6 overflow-hidden w-full lg:w-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

