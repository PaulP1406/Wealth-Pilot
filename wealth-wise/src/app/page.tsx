'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import NavBar from '../components/navBar';
import Footer from '../components/footer';
export default function Home() {
  const features = [
    {
      title: "Smart Capital Tracking",
      description: "Monitor your total capital across all accounts with real-time balance updates and intelligent categorization.",
      icon: "💰",
      metric: "$34,809.89",
      delay: 0.1
    },
    {
      title: "Goal-Based Investing",
      description: "Set monthly goals and track progress with AI-powered forecasting and portfolio optimization.",
      icon: "📈",
      metric: "52% / $56,000",
      delay: 0.2
    },
    {
      title: "Expense Analytics",
      description: "Visualize spending patterns with interactive charts and get personalized budget recommendations.",
      icon: "📊",
      metric: "43% Rent",
      delay: 0.3
    }
  ];

  const transactions = [
    { name: "Maria Charles", type: "Card transfer", amount: "-$100.00", icon: "👤" },
    { name: "We Work", type: "Health & Fitness", amount: "-$290.00", icon: "🏢" },
    { name: "Uber", type: "Transport", amount: "-$56.00", icon: "🚗" },
    { name: "Netflix", type: "Entertainment", amount: "-$19.99", icon: "📺" }
  ];

  const accounts = [
    { name: "Main source of capital", balance: "$21,487.16", account: "...4141", active: true },
    { name: "Additional source of capital", balance: "$9,678.00", account: "...6721 VISA", active: true },
    { name: "Additional source of capital", balance: "$3,644.73", account: "...5995 VISA", active: true }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Navigation Bar */}
      <NavBar />
      
      {/* Hero Section */}
      <section className="pt-46 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Master your finances with{' '}
                <span className="text-yellow-400">intelligence.</span>
              </h1>
              <p className="mt-6 text-xl text-gray-300 leading-relaxed">
                Track capital, set goals, and optimize spending with AI-powered insights — all in one sophisticated dashboard.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-yellow-400 text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-500 transition-colors"
                >
                  Start Free Trial
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-[#3a3a3a] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#3a3a3a] transition-colors"
                >
                  View Demo
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Dashboard Preview */}
              <div className="bg-[#2a2a2a] rounded-2xl p-6 border border-[#3a3a3a] shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                      <span className="text-black font-bold">W</span>
                    </div>
                    <span className="text-white font-semibold">WealthPilot</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#3a3a3a] rounded-lg p-4">
                    <div className="text-2xl font-bold text-white">$34,809.89</div>
                    <div className="text-sm text-gray-400">Your capital</div>
                  </div>
                  <div className="bg-green-500 rounded-lg p-4">
                    <div className="text-2xl font-bold text-white">52%</div>
                    <div className="text-sm text-green-100">Goal progress</div>
                  </div>
                </div>
                
                <div className="mt-4 bg-[#3a3a3a] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Monthly Goal</span>
                    <span className="text-sm text-white">52% / $56,000</span>
                  </div>
                  <div className="w-full bg-[#1a1a1a] rounded-full h-2">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '52%' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#2a2a2a]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Powerful features for modern finance
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to track, analyze, and optimize your financial life.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: feature.delay }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-[#3a3a3a] p-8 rounded-xl border border-[#4a4a4a] hover:border-yellow-400 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed mb-4">{feature.description}</p>
                <div className="text-2xl font-bold text-yellow-400">{feature.metric}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section id="dashboard" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Your financial dashboard
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              See your finances in real-time with our sophisticated dashboard.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Capital & Goals */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-[#2a2a2a] rounded-xl p-6 border border-[#3a3a3a]"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">Your capital</h3>
                  <button className="text-yellow-400 text-sm hover:text-yellow-300">This month</button>
                </div>
                <div className="text-4xl font-bold text-white mb-4">$34,809.89</div>
                <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                  <span>All accounts</span>
                  <span>3/3 selected</span>
                </div>
                
                <div className="space-y-3">
                  {accounts.map((account, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-[#3a3a3a] rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full ${account.active ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                        <div>
                          <div className="text-white font-medium">{account.name}</div>
                          <div className="text-sm text-gray-400">{account.account}</div>
                        </div>
                      </div>
                      <div className="text-white font-semibold">{account.balance}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-[#2a2a2a] rounded-xl p-6 border border-[#3a3a3a]"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">Monthly goal</h3>
                  <button className="text-yellow-400 text-sm hover:text-yellow-300">Edit goal</button>
                </div>
                <div className="text-3xl font-bold text-white mb-2">52% / $56,000</div>
                <div className="w-full bg-[#1a1a1a] rounded-full h-3 mb-4">
                  <div className="bg-yellow-400 h-3 rounded-full" style={{ width: '52%' }}></div>
                </div>
                <div className="text-sm text-gray-400">Forecasted capital is $39,968.60</div>
              </motion.div>
            </div>

            {/* Right Column - Payments & Transactions */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-green-500 rounded-xl p-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <span className="text-green-500 font-bold">H</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Henry Rogers</div>
                    <div className="text-green-100 text-sm">...5995 VISA</div>
                  </div>
                </div>
                <div className="text-sm text-green-100 mb-2">unregular payment</div>
                <div className="text-3xl font-bold text-white">$1,200.00</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-[#2a2a2a] rounded-xl p-6 border border-[#3a3a3a]"
              >
                <h3 className="text-xl font-semibold text-white mb-4">Recent transactions</h3>
                <div className="space-y-4">
                  {transactions.map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-[#3a3a3a] rounded-full flex items-center justify-center text-sm">
                          {transaction.icon}
                        </div>
                        <div>
                          <div className="text-white font-medium">{transaction.name}</div>
                          <div className="text-sm text-gray-400">{transaction.type}</div>
                        </div>
                      </div>
                      <div className="text-red-400 font-semibold">{transaction.amount}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-yellow-400 to-yellow-500">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-6">
              Ready to master your finances?
            </h2>
            <p className="text-xl text-black/80 mb-8">
              Join thousands of users who are already optimizing their financial life with WealthPilot.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-900 transition-colors"
            >
              Start Your Free Trial
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
