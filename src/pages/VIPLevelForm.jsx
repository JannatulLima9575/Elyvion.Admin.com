import { useState, useEffect } from "react";

/* ---------- Row Component (Label Left, Field Right) ---------- */
const Row = ({ label, children }) => (
  <div className="grid grid-cols-12 items-center gap-6 py-3">
    <label className="col-span-4 text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="col-span-8">{children}</div>
  </div>
);

const VIPLevelForm = ({ isOpen, level, onClose, onSuccess }) => {

  /* 🔥 prevents auto opening */
  if (!isOpen) return null;

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

  /* Prefill data when editing */
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
      console.log("Updated data:", formData);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[720px] max-w-[95%] p-6 relative shadow-xl">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-6">Edit VIP Level</h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 max-h-[70vh] overflow-y-auto pr-2"
        >

          {/* ---------- Basic Details ---------- */}
          <div>
            <h3 className="font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-2">
              Basic Details
            </h3>

            <Row label="VIP Level Name">
              <input
                type="text"
                name="ambassadorLevelName"
                value={formData.ambassadorLevelName}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />
            </Row>

            <Row label="Min Amount">
              <input
                type="number"
                name="cashBonusGiven"
                value={formData.cashBonusGiven}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />
            </Row>
          </div>

          {/* ---------- Task Details ---------- */}
          <div>
            <h3 className="font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-2">
              Task Details
            </h3>

            <Row label="Daily Task Count">
              <input
                type="number"
                name="eachSetTaskNumber"
                value={formData.eachSetTaskNumber}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />
            </Row>

            <Row label="Daily Task Set">
              <input
                type="number"
                name="totalTaskSet"
                value={formData.totalTaskSet}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />
            </Row>

            <Row label="Product Range %">
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  name="taskPriceRangeFrom"
                  value={formData.taskPriceRangeFrom}
                  onChange={handleChange}
                  className="w-40 border rounded-lg px-4 py-2"
                />
                <span className="text-gray-500">To</span>
                <input
                  type="number"
                  name="taskPriceRangeTo"
                  value={formData.taskPriceRangeTo}
                  onChange={handleChange}
                  className="w-40 border rounded-lg px-4 py-2"
                />
              </div>
            </Row>

            <Row label="Commission Percentage">
              <input
                type="number"
                name="incentivePercentage"
                value={formData.incentivePercentage}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />
            </Row>

            <Row label="Combo Commission Percentage">
              <input
                type="number"
                name="comboTaskIncentivePercentage"
                value={formData.comboTaskIncentivePercentage}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />
            </Row>
          </div>

          {/* ---------- Withdrawal Details ---------- */}
          <div>
            <h3 className="font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-2">
              Withdrawal Details
            </h3>

            <Row label="Min Withdrawal Amount">
              <input
                type="number"
                name="minWithdrawalAmount"
                value={formData.minWithdrawalAmount}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />
            </Row>

            <Row label="Max Withdrawal Amount">
              <input
                type="number"
                name="maxWithdrawalAmount"
                value={formData.maxWithdrawalAmount}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />
            </Row>

            <Row label="Completed Task/Day To Withdraw">
              <input
                type="number"
                name="requiredTaskCountToWithdraw"
                value={formData.requiredTaskCountToWithdraw}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />
            </Row>

            <Row label="Withdrawal Fees">
              <input
                type="number"
                name="withdrawalFees"
                value={formData.withdrawalFees}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />
            </Row>
          </div>

          {/* Submit */}
          <div className="pt-4 justify-center flex">
            <button
              type="submit"
              className="bg-[#7c3aed] text-white px-8 py-2 rounded-lg font-semibold hover:bg-[#6d28d9]"
            >
              Confirm Update VIP Level
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default VIPLevelForm;