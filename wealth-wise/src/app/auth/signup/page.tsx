'use client';

import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';
import {signup} from './action';

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    async function signUpNewUser() {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                emailRedirectTo: 'https://example.com/welcome',
            },
        })
    }
    return (
        <div className="min-h-screen bg-[#1a1a1a] flex">
            <div className="hidden md:block w-2/3 bg-white">
                <Link href="/" className="flex items-left justify-left h-full mx-auto px-16 py-12">
                    <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-black font-bold text-lg">W</span>
                    </div>
                </Link>
                <img
                    src="/signin-illustration.svg"
                    alt="Sign In Illustration"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="w-full md:w-1/3 flex items-center justify-center p-8">
                <main className="w-full max-w-md bg-[#3a3a3a] rounded-xl shadow-lg p-8">
                    <h1 className="text-3xl flex justify-center font-bold text-white mb-6">Create an account</h1>
                    <form className="space-y-6 flex flex-col items-center">
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
                                onChange={(e) => setEmail(e.target.value)}
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
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>                     
                                                
                        <button
                            type="submit"
                            className="w-36 mx-auto mt-8 bg-yellow-400 text-black font-semibold py-2 rounded-4xl hover:bg-yellow-500 transition-colors"
                            formAction={signup}
                        >
                            Sign Up
                        </button>                    
                    </form>
                    
                    <div className="mt-6 text-center text-white">
                        already have an account?{' '}
                        <Link href="/auth/signin" className="text-yellow-500 hover:underline">
                            Sign In
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    );
}