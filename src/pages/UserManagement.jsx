import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Users, Key } from 'lucide-react';
import { format } from 'date-fns';
import { userService } from '../services/userService';

const UserManagement = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    startDate: '2026-02-02',
    endDate: '2026-02-03'
  });
  const [rowsPerPage, setRowsPerPage] = useState(100);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await userService.getUsers({ limit: rowsPerPage });
        const usersData = response?.data || response || [];
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [rowsPerPage]);

  const handleFilter = async () => {
    try {
      setLoading(true);
      const response = await userService.getUsers({ limit: rowsPerPage });
      const usersData = response?.data || response || [];
      setUsers(usersData);
    } catch (error) {
      console.error('Error filtering users:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      return format(new Date(dateStr), 'yyyy-MM-dd');
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="">
      {/* Filters */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-600 whitespace-nowrap">*{t('createdDate')} :</label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
            />
            <span>-</span>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
            />
          </div>
          <button 
            onClick={handleFilter}
            disabled={loading}
            className="px-16 py-2 bg-[#7c3aed] text-white rounded-lg font-medium hover:bg-[#6d28d9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? t('loading') || 'Loading...' : t('filter')}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading && users.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-500">Loading...</div>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-white border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{t('createdDate')}</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{t('adminName')}</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{t('whatsappUrl')}</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{t('telegramUrl')}</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{t('telegramUrl2')}</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{t('telegramUrl3')}</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700"></th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600">{user.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{user.userName}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.waUrl || ''}</td>
                <td className="px-6 py-4 text-sm text-blue-600">{user.telegramUrl || ''}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.telegramUrl2 || ''}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.telegramUrl3 || ''}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-[#7c3aed] hover:bg-[#7c3aed] hover:text-white rounded transition-colors">
                      <Users size={20} />
                    </button>
                    <button className="p-2 text-[#7c3aed] hover:bg-[#7c3aed] hover:text-white rounded transition-colors">
                      <Key size={20} />
                    </button>
                  </div>
                </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end px-6 py-4 border-t border-gray-200">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{t('rowsPerPage')}:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="text-sm text-gray-600">1–{users.length} {t('of')} {users.length}</span>
          <div className="flex items-center gap-1">
            <button className="p-1 hover:bg-gray-100 rounded">&lt;</button>
            <button className="p-1 hover:bg-gray-100 rounded">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;

