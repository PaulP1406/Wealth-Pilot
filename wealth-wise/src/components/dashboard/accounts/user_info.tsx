export function UserInfoCard() {
  return (
    <div className="mt-8 bg-[#2a2a2a] rounded-xl p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">Account Owner</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <span className="text-gray-400 text-sm">Email:</span>
          <span className="ml-2 text-white">user@example.com</span>
        </div>
        <div>
          <span className="text-gray-400 text-sm">User ID:</span>
          <span className="ml-2 text-white font-mono text-sm bg-[#3a3a3a] px-2 py-1 rounded">
            abc123...
          </span>
        </div>
      </div>
    </div>
  )
}