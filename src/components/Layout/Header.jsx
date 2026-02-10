import { Menu, Settings, LogOut } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = ({ onToggleSidebar }) => {
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
   const rs=await logout();
    if(rs) navigate('/login');
  };

  return (
    <header className="h-24 bg-white  flex items-center justify-between  py-4  sticky top-0 z-50">
      <div className="flex items-center gap-2 md:gap-4">
        <h1 className="text-lg md:text-xl font-bold text-gray-900 whitespace-nowrap">Account Backoffice</h1>
        <button 
          onClick={onToggleSidebar}
          className="p-2 cursor-pointer bg-[#ede7f6] text-[#5e35b1] rounded-lg hover:bg-[#6d28d9] hover:text-white transition-colors"
        >
          <Menu size={20} />
        </button>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative">
          <label className="text-xs text-gray-500 absolute -top-2 left-3 bg-white px-1 hidden sm:block">
            {t('language')}
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-2 md:px-4 py-2 pr-6 md:pr-8 text-xs md:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#7c3aed] cursor-pointer min-w-[80px] md:min-w-[120px]"
          >
            <option value="en">{t('english')}</option>
            <option value="zh">{t('chinese')}</option>
          </select>
          <div className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-3 h-3 md:w-4 md:h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        <button className="px-2 md:px-4 py-2   text-[#2196f3] bg-[#eef2f6] rounded-lg text-xs md:text-sm font-medium   whitespace-nowrap">
          {'ADMIN'}
        </button>
        
        <button 
          onClick={handleLogout}
          className="pl-2 text-gray-500 hover:text-red-600 transition-colors"
          title={t('logout') || 'Logout'}
        >
          <LogOut size={20} className="md:w-6 md:h-6 text-[#2196f3]" />
        </button>
      </div>
    </header>
  );
};

export default Header;

