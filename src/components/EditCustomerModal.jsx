import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { customerService } from '../services/customerService';
import { masterDataService } from '../services/masterDataService';
import Modal from './Modal';

const EditCustomerModal = ({ isOpen, onClose, onSuccess, customer }) => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [ambassadorLevels, setAmbassadorLevels] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    referralCode: '',
    ambassadorLevelID: '',
    loginPassword: '',
  });

  useEffect(() => {
    if (isOpen) {
      fetchAmbassadorLevels();
      if (customer) {
        setFormData({
          name: customer.name || '',
          phoneNumber: customer.phoneNumber || '',
          referralCode: customer.referralCode || '',
          ambassadorLevelID: customer.ambassadorLevelID || '',
          loginPassword: '',
        });
      }
    }
  }, [isOpen, customer]);

  const fetchAmbassadorLevels = async () => {
    try {
      const response = await masterDataService.getAmbassadorLevels();
      const levels = response?.data || response || [];
      setAmbassadorLevels(levels);
    } catch (error) {
      console.error('Error fetching ambassador levels:', error);
    }
  };

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
      await customerService.updateCustomer(customer.id, formData);
      onSuccess?.();
      onClose();
    } catch (error) {
      setError(error.message || 'Failed to update customer');
    } finally {
      setLoading(false);
    }
  };

  if (!customer) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('editCustomer') || 'Edit Customer'} size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              {t('vipLevel') || 'VIP Level'}
            </label>
            <select
              name="ambassadorLevelID"
              value={formData.ambassadorLevelID}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
            >
              <option value="">Select Level</option>
              {ambassadorLevels.map(level => (
                <option key={level.id} value={level.id}>
                  {level.ambassadorLevelName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('password') || 'New Password'} (leave blank to keep current)
            </label>
            <input
              type="password"
              name="loginPassword"
              value={formData.loginPassword}
              onChange={handleChange}
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

export default EditCustomerModal;

