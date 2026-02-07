import { useLanguage } from '../context/LanguageContext';

const MasterDataManagement = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('masterDataManagement')}</h2>
      <p className="text-gray-600">Master data management features coming soon...</p>
    </div>
  );
};

export default MasterDataManagement;

