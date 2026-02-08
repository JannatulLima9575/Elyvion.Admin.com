import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { masterDataService } from '../services/masterDataService';
import VIPLevelModal from '../components/VIPLevelModal';
import { Trash2 } from 'lucide-react';

const VIPLevelManagement = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [levels, setLevels] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);


  const fetchLevels = async () => {
    try {
      setLoading(true);
      const response = await masterDataService.getAmbassadorLevels();
      const levelsData = response?.data || response || [];
      setLevels(levelsData);
    } catch (error) {
      console.error('Error fetching ambassador levels:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLevels();
  }, []);

  const handleEdit = (level) => {
    setSelectedLevel(level);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedLevel(null);
    setIsModalOpen(true);
  };

  const handleDeleteLevel = async (id) => {
    if (!window.confirm(t('confirmDelete') || 'Are you sure you want to delete this VIP level?')) {
      return;
    }

    try {
      await masterDataService.deleteAmbassadorLevel(id);
      fetchLevels(); // Refresh list
    } catch (error) {
      console.error('Error deleting VIP level:', error);
      alert(error.message || 'Failed to delete VIP level');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">

      <VIPLevelModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedLevel(null);
        }}
        onSuccess={() => {
          fetchLevels();
        }}
        level={selectedLevel}
      />

      {/* Table */}
      <div className="overflow-x-auto">
        {loading && levels.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-500">Loading...</div>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 w-32">{t('vipLevel')}</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">{t('taskSettings')}</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">{t('withdrawalLimitation')}</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 w-24"></th>
              </tr>
            </thead>
            <tbody>
              {levels.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                    No levels found
                  </td>
                </tr>
              ) : (
                levels.map((level) => (
              <tr key={level.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-6 text-sm font-semibold text-gray-900">
                  {level.ambassadorLevelName}
                </td>
                <td className="px-6 py-6">
                  <div className="text-sm space-y-1 text-gray-600">
                    <div><span className="text-[#7c3aed]">{t('minAmount')}:</span> {level.cashBonusGiven}</div>
                    <div><span className="text-[#7c3aed]">{t('taskCount')}:</span> {level.eachSetTaskNumber}</div>
                    <div><span className="text-[#7c3aed]">{level.totalTaskSet}Task Set</span></div>
                    <div><span className="text-[#7c3aed]">{t('commissionPercentage')}:</span> {level.incentivePercentage}</div>
                    <div><span className="text-[#7c3aed]">{t('comboCommissionPercentage')}:</span> {level.comboTaskIncentivePercentage}</div>
                    <div>
                      <span className="text-[#7c3aed]">{t('productRange')} %:</span> {level.taskPriceRangeFrom}% {t('productRange')} % {level.taskPriceRangeTo}%
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <div className="text-sm space-y-1 text-gray-600">
                    <div><span className="text-[#7c3aed]">{t('minWithdrawalAmount')}:</span> {level.minWithdrawalAmount}</div>
                    <div><span className="text-[#7c3aed]">{t('maxWithdrawalAmount')}:</span> {level.maxWithdrawalAmount}</div>
                    <div><span className="text-[#7c3aed]">{t('completedTaskDayToWithdraw')}:</span> {level.requiredTaskCountToWithdraw}</div>
                    <div><span className="text-[#7c3aed]">{t('withdrawalFees')}:</span> {level.withdrawalFees}%</div>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleEdit(level)}
                      className="px-6 py-2 bg-[#7c3aed] text-white text-sm rounded font-medium hover:bg-[#6d28d9] transition-colors">
                      {t('edit')}
                    </button>
                    <button 
                      onClick={() => handleDeleteLevel(level.id)}
                      className="p-2 text-red-500 hover:bg-red-500 hover:text-white rounded transition-colors"
                      title={t('delete') || 'Delete'}
                    >
                      <Trash2 size={20} />
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
    </div>
  );
};

export default VIPLevelManagement;

