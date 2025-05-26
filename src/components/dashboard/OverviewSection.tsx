
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
  { name: 'Auto Response', value: 85, color: '#10B981' },
  { name: 'Manual Response', value: 15, color: '#8B5CF6' },
];

const topQuestions = [
  { question: "What are your business hours?", count: 124 },
  { question: "How can I track my order?", count: 98 },
  { question: "What is your return policy?", count: 87 },
  { question: "Do you offer discounts?", count: 76 },
  { question: "How to contact support?", count: 65 },
];

export const OverviewSection = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Overview Dashboard
        </h2>
        <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-6 rounded-2xl shadow-lg border border-green-200/50 hover:shadow-xl transition-all duration-300 hover-scale">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Total Conversations</p>
              <p className="text-3xl font-bold text-green-700">2,847</p>
              <p className="text-xs text-green-500 mt-1">+12% from last week</p>
            </div>
            <MessageSquare className="w-12 h-12 text-green-500" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-6 rounded-2xl shadow-lg border border-blue-200/50 hover:shadow-xl transition-all duration-300 hover-scale">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Active Users</p>
              <p className="text-3xl font-bold text-blue-700">486</p>
              <p className="text-xs text-blue-500 mt-1">+8% from last week</p>
            </div>
            <Users className="w-12 h-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-6 rounded-2xl shadow-lg border border-purple-200/50 hover:shadow-xl transition-all duration-300 hover-scale">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Documents</p>
              <p className="text-3xl font-bold text-purple-700">127</p>
              <p className="text-xs text-purple-500 mt-1">+3 new this week</p>
            </div>
            <FileText className="w-12 h-12 text-purple-500" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 p-6 rounded-2xl shadow-lg border border-indigo-200/50 hover:shadow-xl transition-all duration-300 hover-scale">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-600 text-sm font-medium">Response Rate</p>
              <p className="text-3xl font-bold text-indigo-700">94.2%</p>
              <p className="text-xs text-indigo-500 mt-1">+2.1% improvement</p>
            </div>
            <TrendingUp className="w-12 h-12 text-indigo-500" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Weekly Conversation Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={conversationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }} 
              />
              <Bar dataKey="auto" fill="url(#autoGradient)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="manual" fill="url(#manualGradient)" radius={[4, 4, 0, 0]} />
              <defs>
                <linearGradient id="autoGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <linearGradient id="manualGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Response Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={responseTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                stroke="none"
              >
                {responseTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-6 mt-4">
            {responseTypeData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Questions */}
      <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Top Questions This Week</h3>
        <div className="space-y-3">
          {topQuestions.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50/50 to-purple-50/30 rounded-xl hover:shadow-md transition-all duration-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 text-white rounded-lg flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </div>
                <span className="text-gray-700 font-medium">{item.question}</span>
              </div>
              <span className="text-purple-600 font-semibold bg-purple-100 px-3 py-1 rounded-full text-sm">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
