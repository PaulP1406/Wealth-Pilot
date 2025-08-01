import {useState} from 'react';
import Link from 'next/link';

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div>
            <nav className="fixed top-0 w-full bg-[#1a1a1a]/80 backdrop-blur-md z-50">
                <div className="max-w-10xl lg:mx-24 mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-24 w-full">
                        <div className="flex items-center flex-shrink-0">
                            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center mr-3">
                                <span className="text-black font-bold text-lg">W</span>
                            </div>
                        </div>

                        {/* nav bar for large screens */}
                        <div className="hidden md:flex items-center space-x-12 flex-1 justify-center">
                            <Link href="#features" className="text-gray-300 hover:text-yellow-400 transition-colors">Features</Link>
                            <Link href="#dashboard" className="text-gray-300 hover:text-yellow-400 transition-colors">Dashboard</Link>
                            <Link href="#pricing" className="text-gray-300 hover:text-yellow-400 transition-colors">Pricing</Link>
                        </div>

                        {/* auth buttons for large screens */}
                        <div className="hidden md:flex items-center space-x-8 flex-shrink-0">
                            <Link href="/auth/signin" className="text-gray-300 hover:text-yellow-400 transition-colors">Sign In</Link>
                            <Link href="/auth/signup">
                                <button className="bg-yellow-400 text-black px-6 py-2 rounded-4xl hover:bg-yellow-500 transition-colors font-semibold">
                                    Get Started
                                </button>
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-300 hover:text-yellow-400"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {isMenuOpen && (
                        <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-[#2a2a2a] border-t border-[#3a3a3a]">
                            <a href="#features" className="block px-3 py-2 text-gray-300 hover:text-yellow-400">Features</a>
                            <a href="#dashboard" className="block px-3 py-2 text-gray-300 hover:text-yellow-400">Dashboard</a>
                            <a href="#pricing" className="block px-3 py-2 text-gray-300 hover:text-yellow-400">Pricing</a>
                            <a href="#signin" className="block px-3 py-2 text-gray-300 hover:text-yellow-400">Sign In</a>
                            <button className="w-full mt-2 bg-yellow-400 text-black px-6 py-2 rounded-lg hover:bg-yellow-500 transition-colors font-semibold">
                            Get Started
                            </button>
                        </div>
                        </div>
                    )}
                </div>
            </nav>
        </div>      
    );
}