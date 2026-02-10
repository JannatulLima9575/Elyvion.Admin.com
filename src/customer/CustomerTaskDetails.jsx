import { useState } from "react";

export default function CustomerTaskDetails({ open, onClose }) {
  const [activeTab, setActiveTab] = useState("all");

  if (!open) return null;

  // daynamic data
  const tasks = [
    {
      id: 4668,
      details: "Example Task Details",
      price: "0.00",
      profit: "0.00",
      status: "Pending",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Overlay - Context click to close */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-5xl rounded-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header Section */}
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-xl font-bold text-gray-800">
            Customer Task Details
          </h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 text-white bg-gray-700 rounded-full transition-colors leading-none"
          >
            <span className="text-xl font-bold pb-1">×</span>
          </button>
        </div>

        {/* Tabs Section - Image-er styling onujayi */}
        <div className="flex justify-center bg-gray-50/50 py-4">
          <div className="flex bg-gray-200 p-1 rounded-md">
            {["All Task", "Combo Task Setting", "Combo Task History"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() =>
                    setActiveTab(tab.toLowerCase().replace(/ /g, ""))
                  }
                  className={`px-4 py-1.5 text-sm font-medium rounded transition-all ${
                    activeTab === tab.toLowerCase().replace(/ /g, "")
                      ? "bg-[#6343D8] text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {tab}
                </button>
              ),
            )}
          </div>
        </div>

        {/* Info Grid - Key: Value format */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-8 px-8 py-6 text-sm bg-white">
          <div className="flex gap-2">
            <span className="text-gray-500 whitespace-nowrap">Code :</span>
            <span className="font-semibold text-gray-800">46803</span>
          </div>
          <div className="flex gap-2">
            <span className="text-gray-500 whitespace-nowrap">
              Login User Name :
            </span>
            <span className="font-semibold text-gray-800">HannaKim</span>
          </div>
          <div className="flex gap-2">
            <span className="text-gray-500 whitespace-nowrap">Completed :</span>
            <span className="font-semibold text-gray-800"></span>
          </div>
          <div className="flex gap-2">
            <span className="text-gray-500 whitespace-nowrap">
              Current Task :
            </span>
            <span className="font-semibold text-gray-800"></span>
          </div>
          <div className="flex gap-2">
            <span className="text-gray-500 whitespace-nowrap">
              Actual Wallet Balance :
            </span>
            <span className="font-semibold text-gray-800 text-purple-700">
              100
            </span>
          </div>
          <div className="flex gap-2">
            <span className="text-gray-500 whitespace-nowrap">
              Wallet Balance :
            </span>
            <span className="font-semibold text-gray-800 text-purple-700">
              100
            </span>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto min-h-[70vh]">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-500 font-medium border-b border-gray-200">
              <tr>
                <th className="px-8 py-4 font-semibold">#</th>
                <th className="px-6 py-4 font-semibold">Details</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Profit</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-8 py-4 text-gray-600">{task.id}</td>
                  <td className="px-6 py-4">{task.details}</td>
                  <td className="px-6 py-4">{task.price}</td>
                  <td className="px-6 py-4">{task.profit}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">
                      {task.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State visual (optional, if no tasks) */}
          {tasks.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <p>No task records found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
