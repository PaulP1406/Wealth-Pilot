export default function SignInPage() {
    return (
        <div className="min-h-screen bg-[#1a1a1a] flex flex-col justify-center items-center grid sm:grid-cols-1 grid-cols-2 gap-8">
            <main className="w-full max-w-md bg-[#3a3a3a] rounded-xl shadow-lg p-8 col-start-2">
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
                    <button
                        type="submit"
                        className="w-36 mx-auto mt-8 bg-yellow-400 text-black font-semibold py-2 rounded-4xl hover:bg-yellow-500 transition-colors"
                    >
                        Sign In
                    </button>                    
                </form>
                
                <div className="mt-6 text-center text-gray-600">
                    Don't have an account?{' '}
                    <a href="/signup" className="text-yellow-500 hover:underline">
                        Sign Up
                    </a>
                </div>
            </main>
            <div className="hidden md:block col-start-1">
                <img
                    src="/signin-illustration.svg"
                    alt="Sign In Illustration"
                    className="w-full h-auto rounded-xl shadow-lg"
                />
            </div>          
        </div>
    );
}