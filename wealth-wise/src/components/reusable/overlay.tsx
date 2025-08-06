export default function Overlay({ children }: { children: React.ReactNode }, isOpen: boolean, {onClose}: {onClose: () => void}) {
  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
        <div className="mb-4 text-center font-semibold text-lg">
            <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              Close
            </button>
        </div>
        {children}
      </div>
    </div>
  )
}