'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  id: string;
  email: string;
  created_at: string;
}

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            
            if (error || !user) {
                router.push('/auth/signin');
            } else {
                setUser(user);
            }
            setLoading(false);
        };
        
        getUser();
    }, [router]);

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error signing out:', error.message);
        } else {
            router.push('/');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#1a1a1a] text-white">
            {/* Header */}
            <header className="bg-[#2a2a2a] border-b border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center mr-3">
                                <span className="text-black font-bold text-lg">W</span>
                            </div>
                            <span className="text-xl font-semibold">WealthWise</span>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome to your Dashboard!</h1>
                    <p className="text-gray-400">Manage your wealth and track your financial goals.</p>
                </div>

                {/* User Info Card */}
                <div className="bg-[#2a2a2a] rounded-xl p-6 mb-8 border border-gray-700">
                    <h2 className="text-xl font-semibold mb-4 text-yellow-400">Your Account Details</h2>
                    <div className="space-y-3">
                        <div>
                            <span className="text-gray-400 font-medium">Email:</span>
                            <span className="ml-2 text-white">{user.email}</span>
                        </div>
                        <div>
                            <span className="text-gray-400 font-medium">User UUID:</span>
                            <span className="ml-2 text-white font-mono text-sm bg-[#3a3a3a] px-2 py-1 rounded">
                                {user.id}
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-400 font-medium">Account Created:</span>
                            <span className="ml-2 text-white">
                                {new Date(user.created_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-700">
                        <h3 className="text-lg font-semibold text-yellow-400 mb-2">Total Balance</h3>
                        <p className="text-3xl font-bold text-white">$0.00</p>
                        <p className="text-gray-400 text-sm mt-1">Connect your accounts to get started</p>
                    </div>

                    <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-700">
                        <h3 className="text-lg font-semibold text-yellow-400 mb-2">Monthly Goal</h3>
                        <p className="text-3xl font-bold text-white">$0</p>
                        <p className="text-gray-400 text-sm mt-1">Set your first savings goal</p>
                    </div>

                    <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-700">
                        <h3 className="text-lg font-semibold text-yellow-400 mb-2">Investments</h3>
                        <p className="text-3xl font-bold text-white">$0.00</p>
                        <p className="text-gray-400 text-sm mt-1">Start building your portfolio</p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <button className="bg-yellow-400 text-black font-semibold py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors">
                            Add Account
                        </button>
                        <button className="bg-[#2a2a2a] border border-gray-700 text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#3a3a3a] transition-colors">
                            Set Goal
                        </button>
                        <button className="bg-[#2a2a2a] border border-gray-700 text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#3a3a3a] transition-colors">
                            View Reports
                        </button>
                        <Link href="/" className="bg-[#2a2a2a] border border-gray-700 text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#3a3a3a] transition-colors text-center">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}