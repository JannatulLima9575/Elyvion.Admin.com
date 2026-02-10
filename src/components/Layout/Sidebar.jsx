import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { 
  LayoutDashboard, 
  Users, 
  ListTodo, 
  Wallet, 
  UserCog, 
  Database, 
  Crown 
} from 'lucide-react';

const Sidebar = ({ pendingWithdrawals = 203,sidebarOpen }) => {
  const { t } = useLanguage();
  
  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: t('dashboard') },
    { path: '/customers', icon: Users, label: t('customerManagement') },
    { path: '/tasks', icon: ListTodo, label: t('taskManagement') },
    { path: '/withdrawals', icon: Wallet, label: t('withdrawalManagement'), badge: pendingWithdrawals },
    { path: '/users', icon: UserCog, label: t('userManagement') },
    { path: '/master-data', icon: Database, label: t('masterDataManagement') },
    { path: '/vip-levels', icon: Crown, label: t('vipLevelManagement') },
  ];

  return (
    <aside className={`${(sidebarOpen && sidebarOpen !=="int")  ? "w-[280px] ":`${sidebarOpen ==="int" ?"w-0  lg:w-[280px] ":' w-0  '}` }   transition-all duration-500 ease-in-out max-h-full  fixed  inset-y-0 left-0 z-50  scroll-arrow  mt-24 min-h-full hover:overflow-auto overflow-hidden bg-white  `}>
      <nav className='py-2 px-2   overflow-hidden mb-24'>
        {menuItems.map((item) => (
         <>
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `  flex items-center gap-3 px-4 py-3  my-4 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-[#ede7f6] text-[#5e35b1]' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <item.icon size={20} className="flex-shrink-0" />
            <span className="text-sm font-medium flex-1 truncate">{item.label}</span>
            {item.badge && (
              <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded flex-shrink-0">
                {item.badge}
              </span>
            )}
          </NavLink>
          <p className="w-full h-[1px] bg-gray-200 my-[1px]"></p>
          </> 
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

