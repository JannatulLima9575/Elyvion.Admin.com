import { useState, useMemo, useEffect } from "react";

export default function CustomerTaskDetails({ open, onClose, customer, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab || "all");

  useEffect(() => {
    setActiveTab(defaultTab || "all");
  }, [defaultTab]);

  // if (!open) return null;

  // MOCK DATA
  const allTasks = [
    { id: 4668, details: "Example Task", price: "0.00", profit: "0.00", status: "Pending" },
  ];

  const comboSettings = [
    { id: 1, details: "Combo A Enabled", price: "-", profit: "-", status: "Active" },
  ];

  const comboHistory = [
    { id: 901, details: "Combo Purchased", price: "50", profit: "5", status: "Success" },
  ];

  const tasks = useMemo(() => {
    if (activeTab === "comboSetting") return comboSettings;
    if (activeTab === "comboHistory") return comboHistory;
    return allTasks;
  }, [activeTab]);

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "success":
      case "active":
        return "bg-green-100 text-green-700";
      case "inactive":
        return "bg-gray-200 text-gray-600";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Overlay with subtle blur */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-5xl rounded-lg shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header - Matching Image */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-[#333]">
            Customer Task Details
          </h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 text-white bg-[#555] rounded-full hover:bg-black transition-all shadow-md"
          >
            <span className="text-2xl font-light leading-none mb-1">×</span>
          </button>
        </div>

        {/* Tabs - Centered like the image */}
        <div className="flex justify-center bg-[#fdfdfd] py-4 border-b">
          <div className="flex bg-[#e9e9e9] p-1 rounded-md shadow-inner">
            <TabButton 
              label="All Task" 
              active={activeTab === "all"} 
              onClick={() => setActiveTab("all")} 
            />
            <TabButton 
              label="Combo Task Setting" 
              active={activeTab === "comboSetting"} 
              onClick={() => setActiveTab("comboSetting")} 
            />
            <TabButton 
              label="Combo Task History" 
              active={activeTab === "comboHistory"} 
              onClick={() => setActiveTab("comboHistory")} 
            />
          </div>
        </div>

        {/* Info Grid - Accurate Labeling */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-10 px-8 py-6 text-[13px] border-b bg-white">
          <Info label="Code" value={customer?.code || "46803"} />
          <Info label="Login User Name" value={customer?.username || "HannaKim"} />
          <Info label="Completed" value={customer?.completed || ""} />
          <Info label="Current Task" value={customer?.currentTask || ""} />
          <Info label="Actual Wallet Balance" value={customer?.actualBalance || "100"} />
          <Info label="Wallet Balance" value={customer?.balance || "100"} />
        </div>

        {/* Table Area */}
        <div className="overflow-auto min-h-[350px] max-h-[60vh]">
          <table className="w-full text-[13px] text-left">
            <thead className="text-gray-600 bg-gray-50/50 border-b sticky top-0">
              <tr>
                <th className="px-8 py-4 font-semibold w-16">#</th>
                <th className="px-6 py-4 font-semibold">Details</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Profit</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-8 py-4 text-gray-500 font-medium">{task.id}</td>
                  <td className="px-6 py-4 text-gray-700">{task.details}</td>
                  <td className="px-6 py-4 text-gray-700">{task.price}</td>
                  <td className="px-6 py-4 text-gray-700">{task.profit}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${getStatusStyle(task.status)}`}>
                      {task.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {tasks.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-gray-400">
              <div className="w-12 h-12 mb-2 opacity-20 border-4 border-dashed border-gray-400 rounded-full animate-spin"></div>
              <p className="text-sm">No records found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper Components for Cleaner Code
function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-1.5 text-sm font-medium rounded transition-all duration-200 ${
        active 
          ? "bg-[#6343D8] text-white shadow-md" 
          : "text-gray-500 hover:text-gray-800"
      }`}
    >
      {label}
    </button>
  );
}

function Info({ label, value }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-gray-500 font-normal whitespace-nowrap">{label} :</span>
      <span className="font-semibold text-gray-800">{value}</span>
    </div>
  );
}