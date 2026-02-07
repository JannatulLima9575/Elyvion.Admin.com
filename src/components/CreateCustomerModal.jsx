import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { customerService } from '../services/customerService';
import { masterDataService } from '../services/masterDataService';
import Modal from './Modal';

const CreateCustomerModal = ({ isOpen, onClose, onSuccess }) => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [ambassadorLevels, setAmbassadorLevels] = useState([]);
  const [formData, setFormData] = useState({
    loginUserName: '',
    loginPassword: '',
    name: '',
    phoneNumber: '',
    referralCode: '',
    ambassadorLevelID: '',
    isActualAccount: true,
    isAllowToTakeTask: true,
    isAllowToCompleteTask: true,
    isAllowToWithdraw: true,
  });

  useEffect(() => {
    if (isOpen) {
      fetchAmbassadorLevels();
    }
  }, [isOpen]);

  const fetchAmbassadorLevels = async () => {
    try {
      const response = await masterDataService.getAmbassadorLevels();
      const levels = response?.data || response || [];
      setAmbassadorLevels(levels);
      if (levels.length > 0 && !formData.ambassadorLevelID) {
        setFormData(prev => ({ ...prev, ambassadorLevelID: levels[0].id }));
      }
    } catch (error) {
      console.error('Error fetching ambassador levels:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await customerService.createCustomer(formData);
      onSuccess?.();
      onClose();
      // Reset form
      setFormData({
        loginUserName: '',
        loginPassword: '',
        name: '',
        phoneNumber: '',
        referralCode: '',
        ambassadorLevelID: ambassadorLevels[0]?.id || '',
        isActualAccount: true,
        isAllowToTakeTask: true,
        isAllowToCompleteTask: true,
        isAllowToWithdraw: true,
      });
    } catch (error) {
      setError(error.message || 'Failed to create customer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('createCustomer') || 'Create Customer'} size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('loginUserName') || 'Login User Name'} *
            </label>
            <input
              type="text"
              name="loginUserName"
              value={formData.loginUserName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('password') || 'Password'} *
            </label>
            <input
              type="password"
              name="loginPassword"
              value={formData.loginPassword}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('name') || 'Name'} *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('phoneNumber') || 'Phone Number'}
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('referralCode') || 'Referral Code'}
            </label>
            <input
              type="text"
              name="referralCode"
              value={formData.referralCode}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('vipLevel') || 'VIP Level'} *
            </label>
            <select
              name="ambassadorLevelID"
              value={formData.ambassadorLevelID}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
            >
              {ambassadorLevels.map(level => (
                <option key={level.id} value={level.id}>
                  {level.ambassadorLevelName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isActualAccount"
              checked={formData.isActualAccount}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">{t('actualAccount') || 'Actual Account'}</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isAllowToTakeTask"
              checked={formData.isAllowToTakeTask}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">{t('allowToStartTask') || 'Allow to Start Task'}</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isAllowToCompleteTask"
              checked={formData.isAllowToCompleteTask}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">{t('allowToCompleteTask') || 'Allow to Complete Task'}</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isAllowToWithdraw"
              checked={formData.isAllowToWithdraw}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">{t('allowToWithdraw') || 'Allow to Withdraw'}</span>
          </label>
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
            {loading ? (t('creating') || 'Creating...') : (t('create') || 'Create')}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateCustomerModal;

