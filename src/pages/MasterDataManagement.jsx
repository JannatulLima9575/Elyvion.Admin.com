import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const MasterDataManagement = () => {
  const { t } = useLanguage();

  // Initial Data (Eta API thekeo ashte pare)
  const initialData = [
    { id: 1, day: 1, updatedBy: 'ADMIN', updateDate: '2026-02-08 9:00:26 PM', amount: '' },
    { id: 2, day: 2, updatedBy: 'TEAM 7', updateDate: '2025-05-21 6:23:42 PM', amount: '20' },
    { id: 3, day: 3, updatedBy: 'TEAM 7', updateDate: '2025-05-21 6:23:43 PM', amount: '40' },
    { id: 4, day: 4, updatedBy: 'TEAM 7', updateDate: '2025-05-21 6:23:48 PM', amount: '80' },
    { id: 5, day: 5, updatedBy: 'TEAM 7', updateDate: '2025-05-21 6:23:52 PM', amount: '160' },
  ];

  const [data, setData] = useState(initialData);

  return (
    <div className="min-h-screen md:pt-0">
      {/* Header Button */}
      <div className="flex justify-center mb-6">
        <button className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-6 py-2 rounded-md font-medium shadow-sm">
          Daily Check In
        </button>
      </div>

      {/* Main Table Container */}
      <div className="w-full mx-auto bg-white rounded-lg shadow-sm border border-gray-300 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-500 text-sm border-b border-gray-300">
              <th className="px-6 py-4 font-semibold">Day Number</th>
              <th className="px-6 py-4 font-semibold text-center">Amount</th>
              <th className="px-6 py-4"></th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                {/* Day Info */}
                <td className="px-6 py-4">
                  <div className="text-gray-900 font-medium mb-1">{item.day}</div>
                  <div className="text-xs text-gray-500">By {item.updatedBy} Updated</div>
                  <div className="text-xs text-gray-400">Updated Date: {item.updateDate}</div>
                </td>

                {/* Amount Display */}
                <td className="px-6 py-4 text-center text-gray-700 font-medium">
                  {item.amount}
                </td>

                {/* Input Field */}
                <td className="px-6 py-4 text-center">
                  <input
                    type="text"
                    className="w-32 border border-gray-300 bg-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    placeholder=""
                  />
                </td>

                {/* Action Button */}
                <td className="px-6 py-4 text-right">
                  <button className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-xs font-semibold py-3 px-6 rounded-md shadow transition-colors leading-tight">
                    Confirm Update <br /> Amount
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MasterDataManagement;