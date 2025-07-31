export default function SignInPage() {
    return (
        <div className="min-h-screen bg-[#1a1a1a] flex">
            <div className="hidden md:block w-2/3 bg-white">
                <a href = "/" className="flex items-left justify-left h-full mx-auto px-16 py-12">
                    <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-black font-bold text-lg">W</span>
                    </div>  
                </a>
                <img
                    src="/signin-illustration.svg"
                    alt="Sign In Illustration"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="w-full md:w-1/3 flex items-center justify-center p-8">
                <main className="w-full max-w-md bg-[#3a3a3a] rounded-xl shadow-lg p-8">
                    <h1 className="text-3xl flex justify-center font-bold text-white mb-6">Sign In</h1>
                    <form className="space-y-6v flex flex-col items-center">
                        <div className="w-full mt-4">
                            <label htmlFor="email" className="block text-white font-medium mb-2">
                                Email address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="w-full h-16 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div className="w-full mt-8">
                            <label htmlFor="password" className="block text-white font-medium mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                className="w-full h-16 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                placeholder="••••••••"
                            />
                        </div>
                        
                        <div className="w-full mt-8 space-y-3 grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                className="w-full h-12 bg-white text-gray-700 font-semibold py-2 px-4 rounded-2xl border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center"
                            >
                                <svg className="w-5 h-5 flex items-center justify-center" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                            </button>
                            
                            <button
                                type="button"
                                className="w-full h-12 bg-[#1877F2] text-white font-semibold py-2 px-4 rounded-2xl hover:bg-[#166FE5] transition-colors flex items-center justify-center"
                            >
                                <svg className="w-5 h-5 flex items-center justify-center" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </button>
                        </div>
                        
                        <div className="w-full mt-6 flex items-center">
                            <div className="flex-1 border-t border-gray-600"></div>
                            <span className="px-4 text-gray-400 text-sm">or</span>
                            <div className="flex-1 border-t border-gray-600"></div>
                        </div>
                        
                        <button
                            type="submit"
                            className="w-36 mx-auto mt-8 bg-yellow-400 text-black font-semibold py-2 rounded-4xl hover:bg-yellow-500 transition-colors"
                        >
                            Sign In
                        </button>                    
                    </form>
                    
                    <div className="mt-6 text-center text-white">
                        Don't have an account?{' '}
                        <a href="/signup" className="text-yellow-500 hover:underline">
                            Sign Up
                        </a>
                    </div>
                </main>
            </div>
        </div>
    );
}