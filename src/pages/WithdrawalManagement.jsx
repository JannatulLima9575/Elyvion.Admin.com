import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { format } from 'date-fns';
import { withdrawalService } from '../services/withdrawalService';

const WithdrawalManagement = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [withdrawals, setWithdrawals] = useState([]);
  const [filters, setFilters] = useState({
    startDate: '2026-02-01',
    endDate: '2026-02-08',
    loginUserName: '',
    code: '',
    status: '1'
  });

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      const response = await withdrawalService.getWithdrawals({
        startDate: filters.startDate,
        endDate: filters.endDate,
        statusID: filters.status ? parseInt(filters.status) : undefined
      });
      const withdrawalsData = response?.data || response || [];
      setWithdrawals(withdrawalsData);
    } catch (error) {
      console.error('Error fetching withdrawals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const handleFilter = () => {
    fetchWithdrawals();
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return '';
    try {
      return format(new Date(dateStr), 'yyyy-MM-dd h:mm:ss a');
    } catch {
      return dateStr;
    }
  };

  const handleStatusUpdate = async (id, statusID) => {
    const action = statusID === 2 ? 'approve' : 'reject';
    if (!window.confirm(`Are you sure you want to ${action} this withdrawal?`)) return;
    
    try {
      await withdrawalService.updateWithdrawalStatus(id, { statusID });
      fetchWithdrawals();
    } catch (error) {
      console.error(`Error ${action}ing withdrawal:`, error);
      alert(`Failed to ${action} withdrawal`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* 1. Filter Section */}
      <div className="p-6">
        <div className="flex flex-wrap items- justify-between gap-y-6 gap-x-10 mb-6 bg-transparent">
          {/* Date Filter */}
          <div className="flex items-center gap-3">
            <label className="text-gray-700 text-sm font-medium">
              <span className="text-red-500">*</span>{t('createdDate')} :
            </label>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                className="border border-gray-300 rounded-xl px-4 py-2 text-sm bg-white focus:outline-none shadow-sm"
              />
              <span className="text-gray-400">-</span>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                className="border border-gray-300 rounded-xl px-4 py-2 text-sm bg-white focus:outline-none shadow-sm"
              />
            </div>
          </div>

          {/* Login User Name Filter */}
          <div className="flex items-center justify-end gap-3">
            <label className="text-gray-700 text-sm font-medium">{t('loginUserName')} :</label>
            <input
              type="text"
              value={filters.loginUserName}
              onChange={(e) => setFilters({ ...filters, loginUserName: e.target.value })}
              className="w-44 border border-gray-300 rounded-xl px-4 py-2 text-sm bg-white focus:outline-none shadow-sm"
            />
          </div>

          {/* Code Filter */}
          <div className="flex items-center justify-start gap-3">
            <label className="text-gray-700 text-sm font-medium">{t('code')} :</label>
            <input
              type="text"
              value={filters.code}
              onChange={(e) => setFilters({ ...filters, code: e.target.value })}
              className="w-44 border border-gray-300 rounded-xl px-4 py-2 text-sm bg-white focus:outline-none shadow-sm"
            />
          </div>
        </div>

        {/* Status and Filter Button */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <label className="text-gray-700 text-sm font-medium">{t('status')} :</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white focus:outline-none shadow-sm"
            >
              <option value="">{t('all')}</option>
              <option value="1">{t('pending')}</option>
              <option value="2">{t('approved')}</option>
              <option value="3">{t('rejected')}</option>
            </select>
          </div>
          
          <button 
            onClick={handleFilter}
            disabled={loading}
            className="px-16 py-2 bg-[#6d28d9] text-white flex justify-center rounded-md font-medium hover:bg-[#5b21b6] shadow-md disabled:opacity-50"
          >
            {loading ? t('loading') : t('filter')}
          </button>
        </div>
      </div>

      {/* 2. Table Section */}
      <div className="w-full bg-white rounded-md shadow-sm border-t border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white">
              <tr className="text-gray-600 text-[13px] font-bold border-b border-gray-100 uppercase tracking-wider">
                <th className="px-6 py-4">{t('date')}</th>
                <th className="px-6 py-4">{t('customer')}</th>
                <th className="px-6 py-4">{t('admin')}</th>
                <th className="px-6 py-4">{t('bankDetails')}</th>
                <th className="px-6 py-4">{t('actualAmount')}</th>
                <th className="px-6 py-4">{t('updatedBy')}</th>
                <th className="px-6 py-4">{t('setting')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {withdrawals.map((withdrawal) => (
                <tr key={withdrawal.id} className="hover:bg-gray-50 transition-colors align-top">
                  {/* Date Column */}
                  <td className="px-6 py-5">
                    <div className="text-sm text-gray-800 mb-1">ID : {withdrawal.id}</div>
                    <div className="text-xs text-gray-500">Created At {formatDateTime(withdrawal.createdDate)}</div>
                  </td>

                  {/* Customer Column */}
                  <td className="px-6 py-5">
                    <div className="text-[13px] space-y-1">
                      <div><span className="text-gray-400">Code :</span> {withdrawal.numberCode}</div>
                      <div className="font-medium text-gray-700">{withdrawal.clientName} ( {withdrawal.loginUserName} )</div>
                      <div><span className="text-gray-400">Wallet Balance :</span> {withdrawal.assetBalance}</div>
                      <div><span className="text-gray-400">Phone Number :</span> {withdrawal.customerPhoneNumber || ''}</div>
                    </div>
                  </td>

                  {/* Admin Column */}
                  <td className="px-6 py-5">
                    <div className="text-[13px] space-y-1 text-gray-600">
                      <div>Admin: <span className="text-gray-800">ADMIN</span></div>
                      <div>By: <span className="text-gray-800">{withdrawal.referrerCustomerLoginUserName || 'N/A'}</span></div>
                      <div className="text-gray-400 italic font-light">{t('recommend')}</div>
                    </div>
                  </td>

                  {/* Bank Details Column */}
                  <td className="px-6 py-5">
                    <div className="text-[13px] space-y-1 text-gray-700">
                      <div><span className="text-gray-400">Withdrawal Amount :</span> {withdrawal.amount}</div>
                      <div><span className="text-gray-400">Bank Name :</span> {withdrawal.manualBankName || withdrawal.bankVendorName}</div>
                      <div><span className="text-gray-400">Bank Account Holder :</span> {withdrawal.bankAccountHolderName}</div>
                      <div><span className="text-gray-400">IBAN :</span> {withdrawal.secondBankAccountNumber}</div>
                    </div>
                  </td>

                  {/* Actual Amount & Status Column */}
                  <td className="px-6 py-5">
                    <div className="text-sm">
                      <div className="font-bold text-gray-800">{withdrawal.amount}</div>
                      <div className={`font-semibold mt-1 ${
                        withdrawal.statusID === 1 ? 'text-orange-400' : 
                        withdrawal.statusID === 2 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {withdrawal.statusID === 1 ? 'Pending' : withdrawal.statusID === 2 ? 'Approved' : 'Rejected'}
                      </div>
                    </div>
                  </td>

                  {/* Updated By Column */}
                  <td className="px-6 py-5 text-sm text-gray-500">
                    {withdrawal.updatedBy || ''}
                  </td>

                  {/* Setting/Action Column */}
                  <td className="px-6 py-5">
                    {withdrawal.statusID === 1 && (
                      <div className="flex flex-col gap-2">
                        <button 
                          onClick={() => handleStatusUpdate(withdrawal.id, 2)}
                          className="bg-[#10b981] hover:bg-green-600 text-white text-[12px] font-bold py-1.5 px-6 rounded-md shadow-sm transition-all">
                          {t('approve') || 'Approve'}
                        </button>
                        <button 
                          onClick={() => handleStatusUpdate(withdrawal.id, 3)}
                          className="bg-[#ef4444] hover:bg-red-600 text-white text-[12px] font-bold py-1.5 px-6 rounded-md shadow-sm transition-all">
                          {t('reject') || 'Reject'}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalManagement;