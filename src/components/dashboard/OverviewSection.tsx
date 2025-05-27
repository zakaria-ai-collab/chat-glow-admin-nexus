
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
  { name: 'Auto Response', value: 85, color: '#059669' },
  { name: 'Manual Response', value: 15, color: '#10B981' },
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
        <h2 className="text-4xl font-bold text-green-800">
          Overview Dashboard
        </h2>
        <div className="text-sm text-green-600 bg-green-50 px-4 py-2 rounded-xl">Last updated: {new Date().toLocaleTimeString()}</div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-green-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-semibold mb-2">Total Conversations</p>
              <p className="text-4xl font-bold text-green-800 mb-1">2,847</p>
              <p className="text-xs text-green-500 bg-green-50 px-2 py-1 rounded-lg inline-block">+12% from last week</p>
            </div>
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-green-200 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-700 text-sm font-semibold mb-2">Active Users</p>
              <p className="text-4xl font-bold text-green-800 mb-1">486</p>
              <p className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-lg inline-block">+8% from last week</p>
            </div>
            <div className="w-16 h-16 bg-green-200 rounded-2xl flex items-center justify-center">
              <Users className="w-8 h-8 text-green-700" />
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-green-300 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-800 text-sm font-semibold mb-2">Documents</p>
              <p className="text-4xl font-bold text-green-900 mb-1">127</p>
              <p className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded-lg inline-block">+3 new this week</p>
            </div>
            <div className="w-16 h-16 bg-green-300 rounded-2xl flex items-center justify-center">
              <FileText className="w-8 h-8 text-green-800" />
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-green-400 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-900 text-sm font-semibold mb-2">Response Rate</p>
              <p className="text-4xl font-bold text-green-900 mb-1">94.2%</p>
              <p className="text-xs text-green-800 bg-green-200 px-2 py-1 rounded-lg inline-block">+2.1% improvement</p>
            </div>
            <div className="w-16 h-16 bg-green-400 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-green-900" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-green-100">
          <h3 className="text-2xl font-semibold text-green-800 mb-6">Weekly Conversation Trends</h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={conversationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#dcfce7" />
              <XAxis dataKey="name" stroke="#166534" />
              <YAxis stroke="#166534" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '2px solid #bbf7d0', 
                  borderRadius: '16px',
                  boxShadow: '0 10px 25px rgba(34, 197, 94, 0.1)'
                }} 
              />
              <Bar dataKey="auto" fill="#059669" radius={[6, 6, 0, 0]} />
              <Bar dataKey="manual" fill="#10B981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg border border-green-100">
          <h3 className="text-2xl font-semibold text-green-800 mb-6">Response Type Distribution</h3>
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
                  backgroundColor: 'white', 
                  border: '2px solid #bbf7d0', 
                  borderRadius: '16px',
                  boxShadow: '0 10px 25px rgba(34, 197, 94, 0.1)'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-8 mt-6">
            {responseTypeData.map((item, index) => (
              <div key={index} className="flex items-center space-x-3 bg-green-50 px-4 py-2 rounded-xl">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-green-800 font-medium">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Questions */}
      <div className="bg-white p-8 rounded-3xl shadow-lg border border-green-100">
        <h3 className="text-2xl font-semibold text-green-800 mb-6">Top Questions This Week</h3>
        <div className="space-y-4">
          {topQuestions.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-6 bg-green-50 rounded-2xl hover:bg-green-100 transition-all duration-200">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-600 text-white rounded-2xl flex items-center justify-center text-lg font-bold">
                  {index + 1}
                </div>
                <span className="text-green-900 font-medium text-lg">{item.question}</span>
              </div>
              <span className="text-green-800 font-bold bg-green-200 px-6 py-3 rounded-2xl text-lg">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
