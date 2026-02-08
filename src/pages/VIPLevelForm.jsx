import { useState, useEffect } from "react";

const VIPLevelForm = ({ level, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    ambassadorLevelName: "",
    cashBonusGiven: "",
    eachSetTaskNumber: "",
    totalTaskSet: "",
    taskPriceRangeFrom: "",
    taskPriceRangeTo: "",
    incentivePercentage: "",
    comboTaskIncentivePercentage: "",
    minWithdrawalAmount: "",
    maxWithdrawalAmount: "",
    requiredTaskCountToWithdraw: "",
    withdrawalFees: "",
  });

  useEffect(() => {
    if (level) setFormData({ ...level });
  }, [level]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // call API to update level
      console.log("Updated data:", formData);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[600px] max-w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        <h2 className="text-2xl font-semibold mb-4">Edit VIP Level</h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Basic Details */}
          <div>
            <h3 className="font-medium mb-2">Basic Details</h3>
            <div className="space-y-3">
              <input
                type="text"
                name="ambassadorLevelName"
                placeholder="VIP Level Name"
                value={formData.ambassadorLevelName}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="number"
                name="cashBonusGiven"
                placeholder="Min Amount"
                value={formData.cashBonusGiven}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
          </div>

          {/* Task Details */}
          <div>
            <h3 className="font-medium mb-2">Task Details</h3>
            <div className="space-y-3">
              <input
                type="number"
                name="eachSetTaskNumber"
                placeholder="Daily Task Count"
                value={formData.eachSetTaskNumber}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="number"
                name="totalTaskSet"
                placeholder="Daily Task Set"
                value={formData.totalTaskSet}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />

              {/* Product Range side by side */}
              <div className="flex gap-2">
                <input
                  type="number"
                  name="taskPriceRangeFrom"
                  placeholder="Product Range % From"
                  value={formData.taskPriceRangeFrom}
                  onChange={handleChange}
                  className="w-1/2 border px-3 py-2 rounded"
                />
                <input
                  type="number"
                  name="taskPriceRangeTo"
                  placeholder="To"
                  value={formData.taskPriceRangeTo}
                  onChange={handleChange}
                  className="w-1/2 border px-3 py-2 rounded"
                />
              </div>

              <input
                type="number"
                name="incentivePercentage"
                placeholder="Commission Percentage"
                value={formData.incentivePercentage}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="number"
                name="comboTaskIncentivePercentage"
                placeholder="Combo Commission Percentage"
                value={formData.comboTaskIncentivePercentage}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>

          {/* Withdrawal Details */}
          <div>
            <h3 className="font-medium mb-2">Withdrawal Details</h3>
            <div className="space-y-3">
              <input
                type="number"
                name="minWithdrawalAmount"
                placeholder="Min Withdrawal Amount"
                value={formData.minWithdrawalAmount}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="number"
                name="maxWithdrawalAmount"
                placeholder="Max Withdrawal Amount"
                value={formData.maxWithdrawalAmount}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="number"
                name="requiredTaskCountToWithdraw"
                placeholder="Completed Task/Day To Withdraw"
                value={formData.requiredTaskCountToWithdraw}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="number"
                name="withdrawalFees"
                placeholder="Withdrawal Fees"
                value={formData.withdrawalFees}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#7c3aed] text-white py-2 rounded hover:bg-[#6d28d9] font-semibold"
          >
            Confirm Update VIP Level
          </button>
        </form>
      </div>
    </div>
  );
};

export default VIPLevelForm;