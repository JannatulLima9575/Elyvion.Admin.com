import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { format } from 'date-fns';
import { withdrawalService } from '../services/withdrawalService';

const WithdrawalManagement = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [withdrawals, setWithdrawals] = useState([]);
  const [filters, setFilters] = useState({
    startDate: '2026-01-27',
    endDate: '2026-02-03',
    loginUserName: '',
    code: '',
    status: '1' // Default to Pending
  });

  useEffect(() => {
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

    fetchWithdrawals();
  }, [filters.startDate, filters.endDate, filters.status]);

  const handleFilter = async () => {
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
      console.error('Error filtering withdrawals:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return '';
    try {
      return format(new Date(dateStr), 'yyyy-MM-dd h:mm:ss a');
    } catch {
      return dateStr;
    }
  };

  const handleApprove = async (id) => {
    try {
      await withdrawalService.updateWithdrawalStatus(id, { statusID: 2 });
      // Refresh withdrawals
      const response = await withdrawalService.getWithdrawals({
        startDate: filters.startDate,
        endDate: filters.endDate,
        statusID: filters.status ? parseInt(filters.status) : undefined
      });
      const withdrawalsData = response?.data || response || [];
      setWithdrawals(withdrawalsData);
    } catch (error) {
      console.error('Error approving withdrawal:', error);
      alert('Failed to approve withdrawal');
    }
  };

  const handleReject = async (id) => {
    try {
      await withdrawalService.updateWithdrawalStatus(id, { statusID: 3 });
      // Refresh withdrawals
      const response = await withdrawalService.getWithdrawals({
        startDate: filters.startDate,
        endDate: filters.endDate,
        statusID: filters.status ? parseInt(filters.status) : undefined
      });
      const withdrawalsData = response?.data || response || [];
      setWithdrawals(withdrawalsData);
    } catch (error) {
      console.error('Error rejecting withdrawal:', error);
      alert('Failed to reject withdrawal');
    }
  };

  const getStatusColor = (statusID) => {
    switch (statusID) {
      case 1: return 'text-orange-500';
      case 2: return 'text-green-500';
      case 3: return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusLabel = (statusID) => {
    switch (statusID) {
      case 1: return t('pending');
      case 2: return t('approved');
      case 3: return t('rejected');
      default: return 'Unknown';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Filters */}
      <div className="p-4 md:p-6 border-b border-gray-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <label className="text-sm font-medium text-red-500 whitespace-nowrap">*{t('createdDate')} :</label>
            <div className="flex items-center gap-2 flex-1 w-full sm:w-auto">
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                className="flex-1 min-w-0 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
              />
              <span>-</span>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                className="flex-1 min-w-0 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <label className="text-sm font-medium whitespace-nowrap">{t('loginUserName')} :</label>
            <input
              type="text"
              value={filters.loginUserName}
              onChange={(e) => setFilters({ ...filters, loginUserName: e.target.value })}
              className="flex-1 w-full sm:w-auto border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <label className="text-sm font-medium whitespace-nowrap">{t('code')} :</label>
            <input
              type="text"
              value={filters.code}
              onChange={(e) => setFilters({ ...filters, code: e.target.value })}
              className="flex-1 w-full sm:w-auto border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
            />
          </div>
          <div className="flex justify-end">
            <button 
              onClick={handleFilter}
              disabled={loading}
              className="w-full sm:w-auto px-8 md:px-16 py-2 bg-[#7c3aed] text-white rounded-lg font-medium hover:bg-[#6d28d9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? t('loading') || 'Loading...' : t('filter')}
            </button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <label className="text-sm font-medium whitespace-nowrap">{t('status')} :</label>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed] w-full sm:w-auto"
          >
            <option value="">{t('all')}</option>
            <option value="1">{t('pending')}</option>
            <option value="2">{t('approved')}</option>
            <option value="3">{t('rejected')}</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading && withdrawals.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-500">Loading...</div>
          </div>
        ) : (
          <table className="w-full min-w-[1200px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{t('date')}</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{t('customer')}</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{t('admin')}</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{t('bankDetails')}</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{t('actualAmount')}</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{t('updatedBy')}</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{t('setting')}</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                    No withdrawals found
                  </td>
                </tr>
              ) : (
                withdrawals.map((withdrawal) => (
                  <tr key={withdrawal.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-4">
                  <div className="text-sm">
                    <div className="font-medium">ID : {withdrawal.id}</div>
                    <div className="text-gray-500">Created At {formatDateTime(withdrawal.createdDate)}</div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm space-y-1">
                    <div><span className="text-gray-500">Code :</span> {withdrawal.numberCode}</div>
                    <div>{withdrawal.clientName} ( {withdrawal.loginUserName} )</div>
                    <div><span className="text-gray-500">Wallet Balance :</span> {withdrawal.assetBalance}</div>
                    <div><span className="text-gray-500">Phone Number :</span> {withdrawal.customerPhoneNumber || ''}</div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm space-y-1">
                    <div><span className="text-gray-500">Admin:</span> ADMIN</div>
                    <div><span className="text-gray-500">By:</span> {withdrawal.referrerCustomerLoginUserName}</div>
                    <div className="text-gray-500">{t('recommend')}</div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm space-y-1">
                    <div><span className="text-gray-500">{t('withdrawalAmount')} :</span> {withdrawal.amount}</div>
                    <div><span className="text-gray-500">{t('bankName')} :</span> {withdrawal.manualBankName || withdrawal.bankVendorName}</div>
                    <div><span className="text-gray-500">{t('bankAccountHolder')} :</span> {withdrawal.bankAccountHolderName}</div>
                    <div><span className="text-gray-500">{t('iban')} :</span> {withdrawal.secondBankAccountNumber}</div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm">
                    <div className="font-medium">{withdrawal.amount}</div>
                    <div className={`${getStatusColor(withdrawal.statusID)} font-medium`}>
                      {getStatusLabel(withdrawal.statusID)}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                  {withdrawal.updatedBy || ''}
                </td>
                <td className="px-4 py-4">
                  {withdrawal.statusID === 1 && (
                    <div className="flex flex-col gap-2">
                      <button 
                        onClick={() => handleApprove(withdrawal.id)}
                        className="px-6 py-1.5 bg-green-500 text-white text-sm rounded font-medium hover:bg-green-600">
                        {t('approve')}
                      </button>
                      <button 
                        onClick={() => handleReject(withdrawal.id)}
                        className="px-6 py-1.5 bg-red-500 text-white text-sm rounded font-medium hover:bg-red-600">
                        {t('reject')}
                      </button>
                    </div>
                  )}
                </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default WithdrawalManagement;

