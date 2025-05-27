
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MessageSquare, Users, FileText, TrendingUp } from 'lucide-react';

const conversationData = [
  { name: 'Mon', auto: 45, manual: 12 },
  { name: 'Tue', auto: 52, manual: 8 },
  { name: 'Wed', auto: 49, manual: 15 },
  { name: 'Thu', auto: 61, manual: 6 },
  { name: 'Fri', auto: 55, manual: 10 },
  { name: 'Sat', auto: 38, manual: 4 },
  { name: 'Sun', auto: 42, manual: 7 },
];

const responseTypeData = [
  { name: 'Auto Response', value: 85, color: '#8B5CF6' },
  { name: 'Manual Response', value: 15, color: '#06B6D4' },
];

const topQuestions = [
  { question: "Quels sont vos horaires d'ouverture?", count: 124 },
  { question: "Comment puis-je suivre ma commande?", count: 98 },
  { question: "Quelle est votre politique de retour?", count: 87 },
  { question: "Offrez-vous des réductions?", count: 76 },
  { question: "Comment contacter le support?", count: 65 },
];

export const OverviewSection = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
          Overview Dashboard
        </h2>
        <div className="text-sm text-purple-700 bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 rounded-2xl shadow-lg">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-8 rounded-3xl shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 transform">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-semibold mb-2">Total Conversations</p>
              <p className="text-4xl font-bold text-white mb-1">2,847</p>
              <p className="text-xs text-purple-200 bg-purple-600/30 px-3 py-1 rounded-lg inline-block">+12% from last week</p>
            </div>
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-8 rounded-3xl shadow-2xl hover:shadow-pink-500/25 hover:scale-105 transition-all duration-300 transform">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100 text-sm font-semibold mb-2">Active Users</p>
              <p className="text-4xl font-bold text-white mb-1">486</p>
              <p className="text-xs text-pink-200 bg-pink-600/30 px-3 py-1 rounded-lg inline-block">+8% from last week</p>
            </div>
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-8 rounded-3xl shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 transform">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-semibold mb-2">Documents</p>
              <p className="text-4xl font-bold text-white mb-1">127</p>
              <p className="text-xs text-blue-200 bg-blue-600/30 px-3 py-1 rounded-lg inline-block">+3 new this week</p>
            </div>
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <FileText className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 rounded-3xl shadow-2xl hover:shadow-emerald-500/25 hover:scale-105 transition-all duration-300 transform">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm font-semibold mb-2">Response Rate</p>
              <p className="text-4xl font-bold text-white mb-1">94.2%</p>
              <p className="text-xs text-emerald-200 bg-emerald-600/30 px-3 py-1 rounded-lg inline-block">+2.1% improvement</p>
            </div>
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-purple-200/50 hover:shadow-purple-500/10 transition-all duration-300">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">Weekly Conversation Trends</h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={conversationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
              <XAxis dataKey="name" stroke="#6366f1" />
              <YAxis stroke="#6366f1" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '2px solid #c4b5fd', 
                  borderRadius: '16px',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)'
                }} 
              />
              <Bar dataKey="auto" fill="url(#purpleGradient)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="manual" fill="url(#pinkGradient)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#A855F7" />
                </linearGradient>
                <linearGradient id="pinkGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EC4899" />
                  <stop offset="100%" stopColor="#F472B6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-blue-200/50 hover:shadow-blue-500/10 transition-all duration-300">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">Response Type Distribution</h3>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={responseTypeData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={120}
                dataKey="value"
                stroke="none"
              >
                {responseTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '2px solid #93c5fd', 
                  borderRadius: '16px',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-8 mt-6">
            {responseTypeData.map((item, index) => (
              <div key={index} className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-xl shadow-lg">
                <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-700 font-medium">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Questions */}
      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-indigo-200/50">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">Top Questions This Week</h3>
        <div className="space-y-4">
          {topQuestions.map((item, index) => {
            const gradients = [
              'from-purple-500 to-purple-600',
              'from-pink-500 to-rose-600',
              'from-blue-500 to-cyan-600',
              'from-emerald-500 to-teal-600',
              'from-orange-500 to-red-600'
            ];
            return (
              <div key={index} className="flex items-center justify-between p-6 bg-gradient-to-r from-white/80 to-gray-50/80 backdrop-blur-sm rounded-2xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-gray-200/50">
                <div className="flex items-center space-x-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${gradients[index]} text-white rounded-2xl flex items-center justify-center text-lg font-bold shadow-lg`}>
                    {index + 1}
                  </div>
                  <span className="text-gray-800 font-semibold text-lg">{item.question}</span>
                </div>
                <span className={`text-white font-bold bg-gradient-to-r ${gradients[index]} px-6 py-3 rounded-2xl text-lg shadow-lg`}>
                  {item.count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
