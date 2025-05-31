
import React, { useState } from 'react';
import { BarChart3, Users, MessageSquare, FileText, TrendingUp, AlertTriangle, Bell, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { Button } from '@/components/ui/button';

const messagesData = [
  { day: 'Lun', messages: 45 },
  { day: 'Mar', messages: 52 },
  { day: 'Mer', messages: 38 },
  { day: 'Jeu', messages: 67 },
  { day: 'Ven', messages: 71 },
  { day: 'Sam', messages: 29 },
  { day: 'Dim', messages: 33 },
];

const documentsData = [
  { type: 'PDF', count: 45, color: '#FF6B6B' },
  { type: 'Images', count: 23, color: '#4ECDC4' },
  { type: 'Texte', count: 18, color: '#45B7D1' },
  { type: 'Excel', count: 12, color: '#FFA07A' },
];

const queriesData = [
  { query: 'Prix produits', count: 89 },
  { query: 'Livraison', count: 67 },
  { query: 'Support', count: 45 },
  { query: 'Catalogue', count: 34 },
  { query: 'Retours', count: 28 },
];

export const OverviewSection = () => {
  const [lastSync, setLastSync] = useState(new Date().toLocaleTimeString());

  const handleRefresh = () => {
    setLastSync(new Date().toLocaleTimeString());
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-6xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-2">
            Vue d'ensemble
          </h2>
          <p className="text-gray-600 flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Dernière sync: {lastSync}
          </p>
        </div>
        <Button onClick={handleRefresh} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300">
          <RefreshCw className="w-4 h-4 mr-2" />
          Actualiser
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 rounded-3xl shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 transform text-white">
          <div className="flex items-center justify-between mb-4">
            <MessageSquare className="w-8 h-8" />
            <div className="text-right">
              <div className="text-3xl font-bold">2,847</div>
              <div className="text-blue-200 text-sm">Messages totaux</div>
            </div>
          </div>
          <div className="text-blue-200 text-sm">+12% cette semaine</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-700 p-6 rounded-3xl shadow-2xl hover:shadow-green-500/25 hover:scale-105 transition-all duration-300 transform text-white">
          <div className="flex items-center justify-between mb-4">
            <FileText className="w-8 h-8" />
            <div className="text-right">
              <div className="text-3xl font-bold">98</div>
              <div className="text-green-200 text-sm">Documents</div>
            </div>
          </div>
          <div className="text-green-200 text-sm">+5 aujourd'hui</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-6 rounded-3xl shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 transform text-white">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8" />
            <div className="text-right">
              <div className="text-3xl font-bold">234</div>
              <div className="text-purple-200 text-sm">Utilisateurs uniques</div>
            </div>
          </div>
          <div className="text-purple-200 text-sm">+18 cette semaine</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-3xl shadow-2xl hover:shadow-orange-500/25 hover:scale-105 transition-all duration-300 transform text-white">
          <div className="flex items-center justify-between mb-4">
            <AlertTriangle className="w-8 h-8" />
            <div className="text-right">
              <div className="text-3xl font-bold">3.2%</div>
              <div className="text-orange-200 text-sm">Taux d'échec</div>
            </div>
          </div>
          <div className="text-orange-200 text-sm">-0.8% vs mois dernier</div>
        </div>

        <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-6 rounded-3xl shadow-2xl hover:shadow-pink-500/25 hover:scale-105 transition-all duration-300 transform text-white">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8" />
            <div className="text-right">
              <div className="text-3xl font-bold">89</div>
              <div className="text-pink-200 text-sm">Demandes non traitées</div>
            </div>
          </div>
          <div className="text-pink-200 text-sm">Nécessite attention</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Messages Chart */}
        <div className="lg:col-span-2 bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-purple-200/50">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Messages par jour</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={messagesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="messages" 
                stroke="url(#colorGradient)" 
                strokeWidth={4}
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, fill: '#8b5cf6' }}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Documents Pie Chart */}
        <div className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-blue-200/50">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Types de documents</h3>
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
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {documentsData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Queries Bar Chart */}
      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-green-200/50">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Requêtes les plus fréquentes</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={queriesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
            <XAxis dataKey="query" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Bar dataKey="count" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
