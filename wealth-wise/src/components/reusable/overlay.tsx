'use client'

interface OverlayProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function Overlay({ children, isOpen, onClose }: OverlayProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#2a2a2a] rounded-xl shadow-lg p-6 w-11/12 max-w-md border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Add New Account</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white text-xl font-bold"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}