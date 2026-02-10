import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-5xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  };

  return (
    <div className="fixed inset-0  z-[999] flex items-center justify-center">
      
      {/* Overlay */}
      <div
        className="absolute inset-0  bg-black/60 bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div
        className={`relative w-full mx-4 overflow-auto max-h-[96vh] bg-white rounded-lg shadow-xl ${sizeClasses[size]}`}
      >
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {title}
            </h3>

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
