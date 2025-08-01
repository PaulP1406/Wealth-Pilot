import Link from 'next/link'

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Something went wrong</h1>
        <p className="text-gray-400 mb-6">
          There was an error confirming your email. Please try signing up again or contact support.
        </p>
        <div className="space-x-4">
          <Link 
            href="/auth/signup" 
            className="bg-yellow-400 text-black px-6 py-2 rounded-lg hover:bg-yellow-500 transition-colors font-semibold"
          >
            Sign Up Again
          </Link>
          <Link 
            href="/" 
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}