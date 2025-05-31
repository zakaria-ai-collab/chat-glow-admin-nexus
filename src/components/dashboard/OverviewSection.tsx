
import React, { useState } from 'react';
import { MessageSquare, Users, FileText, AlertTriangle, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Button } from '@/components/ui/button';

const messagesData = [
  { day: 'Mon', messages: 45 },
  { day: 'Tue', messages: 52 },
  { day: 'Wed', messages: 38 },
  { day: 'Thu', messages: 67 },
  { day: 'Fri', messages: 71 },
  { day: 'Sat', messages: 29 },
  { day: 'Sun', messages: 33 },
];

const documentsData = [
  { type: 'PDF', count: 45, color: '#3B82F6' },
  { type: 'Images', count: 23, color: '#10B981' },
  { type: 'Text', count: 18, color: '#F59E0B' },
  { type: 'Excel', count: 12, color: '#EF4444' },
];

export const OverviewSection = () => {
  const [lastSync, setLastSync] = useState(new Date().toLocaleTimeString());

  const handleRefresh = () => {
    setLastSync(new Date().toLocaleTimeString());
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Overview
          </h2>
          <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2 mt-1">
            <RefreshCw className="w-4 h-4" />
            Last sync: {lastSync}
          </p>
        </div>
        <Button onClick={handleRefresh} className="bg-blue-600 hover:bg-blue-700">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Messages</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">2,847</p>
              <p className="text-green-600 text-sm">+12% this week</p>
            </div>
            <MessageSquare className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Active Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">234</p>
              <p className="text-green-600 text-sm">+18 this week</p>
            </div>
            <Users className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Documents</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">98</p>
              <p className="text-green-600 text-sm">+5 today</p>
            </div>
            <FileText className="w-8 h-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Fallback Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">3.2%</p>
              <p className="text-red-600 text-sm">-0.8% vs last month</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Messages per Day</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={messagesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="messages" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Documents Pie Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Document Types</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={documentsData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="count"
              >
                {documentsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {documentsData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{item.type}: {item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
