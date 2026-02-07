import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { masterDataService } from '../services/masterDataService';
import Modal from './Modal';

const VIPLevelModal = ({ isOpen, onClose, onSuccess, level = null }) => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    ambassadorLevelName: '',
    cashBonusGiven: '',
    eachSetTaskNumber: '',
    totalTaskSet: '',
    incentivePercentage: '',
    comboTaskIncentivePercentage: '',
    taskPriceRangeFrom: '',
    taskPriceRangeTo: '',
    minWithdrawalAmount: '',
    maxWithdrawalAmount: '',
    requiredTaskCountToWithdraw: '',
    withdrawalFees: '',
  });

  useEffect(() => {
    if (isOpen) {
      if (level) {
        // Edit mode - populate form
        setFormData({
          ambassadorLevelName: level.ambassadorLevelName || '',
          cashBonusGiven: level.cashBonusGiven || '',
          eachSetTaskNumber: level.eachSetTaskNumber || '',
          totalTaskSet: level.totalTaskSet || '',
          incentivePercentage: level.incentivePercentage || '',
          comboTaskIncentivePercentage: level.comboTaskIncentivePercentage || '',
          taskPriceRangeFrom: level.taskPriceRangeFrom || '',
          taskPriceRangeTo: level.taskPriceRangeTo || '',
          minWithdrawalAmount: level.minWithdrawalAmount || '',
          maxWithdrawalAmount: level.maxWithdrawalAmount || '',
          requiredTaskCountToWithdraw: level.requiredTaskCountToWithdraw || '',
          withdrawalFees: level.withdrawalFees || '',
        });
      } else {
        // Create mode - reset form
        setFormData({
          ambassadorLevelName: '',
          cashBonusGiven: '',
          eachSetTaskNumber: '',
          totalTaskSet: '',
          incentivePercentage: '',
          comboTaskIncentivePercentage: '',
          taskPriceRangeFrom: '',
          taskPriceRangeTo: '',
          minWithdrawalAmount: '',
          maxWithdrawalAmount: '',
          requiredTaskCountToWithdraw: '',
          withdrawalFees: '',
        });
      }
    }
  }, [isOpen, level]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (level) {
        await masterDataService.updateAmbassadorLevel(level.id, formData);
      } else {
        await masterDataService.createAmbassadorLevel(formData);
      }
      onSuccess?.();
      onClose();
    } catch (error) {
      setError(error.message || `Failed to ${level ? 'update' : 'create'} VIP level`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={level ? (t('editVIPLevel') || 'Edit VIP Level') : (t('createVIPLevel') || 'Create VIP Level')} 
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('vipLevel') || 'VIP Level Name'} *
            </label>
            <input
              type="text"
              name="ambassadorLevelName"
              value={formData.ambassadorLevelName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('minAmount') || 'Min Amount'} *
            </label>
            <input
              type="number"
              name="cashBonusGiven"
              value={formData.cashBonusGiven}
              onChange={handleChange}
              required
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('taskCount') || 'Task Count'} *
            </label>
            <input
              type="number"
              name="eachSetTaskNumber"
              value={formData.eachSetTaskNumber}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('totalTaskSet') || 'Total Task Set'} *
            </label>
            <input
              type="number"
              name="totalTaskSet"
              value={formData.totalTaskSet}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('commissionPercentage') || 'Commission %'} *
            </label>
            <input
              type="number"
              name="incentivePercentage"
              value={formData.incentivePercentage}
              onChange={handleChange}
              required
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('comboCommissionPercentage') || 'Combo Commission %'} *
            </label>
            <input
              type="number"
              name="comboTaskIncentivePercentage"
              value={formData.comboTaskIncentivePercentage}
              onChange={handleChange}
              required
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('productRange') || 'Price Range From'} % *
            </label>
            <input
              type="number"
              name="taskPriceRangeFrom"
              value={formData.taskPriceRangeFrom}
              onChange={handleChange}
              required
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('productRange') || 'Price Range To'} % *
            </label>
            <input
              type="number"
              name="taskPriceRangeTo"
              value={formData.taskPriceRangeTo}
              onChange={handleChange}
              required
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('minWithdrawalAmount') || 'Min Withdrawal'} *
            </label>
            <input
              type="number"
              name="minWithdrawalAmount"
              value={formData.minWithdrawalAmount}
              onChange={handleChange}
              required
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('maxWithdrawalAmount') || 'Max Withdrawal'} *
            </label>
            <input
              type="number"
              name="maxWithdrawalAmount"
              value={formData.maxWithdrawalAmount}
              onChange={handleChange}
              required
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('completedTaskDayToWithdraw') || 'Required Tasks'} *
            </label>
            <input
              type="number"
              name="requiredTaskCountToWithdraw"
              value={formData.requiredTaskCountToWithdraw}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('withdrawalFees') || 'Withdrawal Fees'} % *
            </label>
            <input
              type="number"
              name="withdrawalFees"
              value={formData.withdrawalFees}
              onChange={handleChange}
              required
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {t('cancel') || 'Cancel'}
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-[#7c3aed] text-white rounded-lg hover:bg-[#6d28d9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (t('saving') || 'Saving...') : (t('save') || 'Save')}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default VIPLevelModal;

