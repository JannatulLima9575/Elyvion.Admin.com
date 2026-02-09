import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const CreateTaskModal = ({ isOpen, onClose, onSuccess }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    image: null
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden relative mx-4">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {t('createProduct') || 'Create Product'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition-colors"
          >
            <X size={32} className="border-2 border-gray-800 rounded-full p-1" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-12 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            
            {/* Product Name Input */}
            <div className="flex items-center gap-4">
              <label className="text-gray-700 font-medium whitespace-nowrap">
                {t('productName') || 'Product Name'} :
              </label>
              <input
                type="text"
                className="w-full border-2 border-gray-800 rounded-2xl px-4 py-3 focus:outline-none shadow-sm"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            {/* Product Price Input */}
            <div className="flex items-center gap-4">
              <label className="text-gray-700 font-medium whitespace-nowrap">
                {t('productPrice') || 'Product Price'} :
              </label>
              <input
                type="number"
                className="w-full border-2 border-gray-800 rounded-2xl px-4 py-3 focus:outline-none shadow-sm"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
            </div>

            {/* Product Image Input */}
            <div className="flex items-center gap-4">
              <label className="text-gray-700 font-medium whitespace-nowrap">
                {t('productImage') || 'Product Image'} :
              </label>
              <div className="flex items-center border-2 border-gray-400 rounded-md p-1 bg-gray-50">
                <input
                  type="file"
                  className="text-sm text-gray-500 file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300"
                  onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
                />
              </div>
            </div>

            {/* Placeholder/Task Text */}
            <div className="flex items-center gap-2">
               <img src="/task-icon.png" alt="Task" className="w-6 h-6 opacity-60" />
               <span className="text-gray-500 italic">Task</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-20 flex justify-center">
            <button
              type="submit"
              className="bg-[#6d28d9] hover:bg-[#5b21b6] text-white font-bold py-3 px-10 rounded-xl shadow-lg transition-all"
            >
              {t('createProduct') || 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;