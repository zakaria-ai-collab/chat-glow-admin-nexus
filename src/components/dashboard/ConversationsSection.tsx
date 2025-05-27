import React, { useState } from 'react';
import { Search, Download, Filter, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const conversations = [
  {
    id: 1,
    user: 'Rachid Benali',
    phone: '0623456789',
    question: 'Quels sont vos horaires d\'ouverture?',
    answer: 'Nos horaires d\'ouverture sont du lundi au vendredi de 9h à 18h, et le samedi de 10h à 16h.',
    confidence: 0.95,
    type: 'auto',
    timestamp: '2024-01-25 14:30',
  },
];

export const ConversationsSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [userFilter, setUserFilter] = useState('all');

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-white bg-gradient-to-r from-green-500 to-emerald-600';
    if (confidence >= 0.6) return 'text-white bg-gradient-to-r from-yellow-500 to-orange-600';
    return 'text-white bg-gradient-to-r from-red-500 to-pink-600';
  };

  const getTypeIcon = (type: string) => {
    return type === 'auto' ? (
      <Bot className="w-5 h-5 text-purple-600" />
    ) : (
      <User className="w-5 h-5 text-blue-600" />
    );
  };

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Conversations
        </h2>
        <div className="flex space-x-4">
          <Button variant="outline" className="border-2 border-blue-300 text-blue-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-2xl shadow-lg px-6 py-3">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" className="border-2 border-purple-300 text-purple-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 rounded-2xl shadow-lg px-6 py-3">
            <Download className="w-4 h-4 mr-2" />
            Export JSON
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-blue-200/50">
        <div className="flex flex-col lg:flex-row gap-6 lg:items-center">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-4 w-full bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300/50 focus:border-blue-400 transition-all shadow-lg"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-blue-600" />
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-48 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl shadow-lg">
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={userFilter} onValueChange={setUserFilter}>
              <SelectTrigger className="w-48 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl shadow-lg">
                <SelectValue placeholder="Filter by user" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="rachid">Rachid Benali</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Conversations List */}
      <div className="space-y-6">
        {filteredConversations.map((conversation) => (
          <div
            key={conversation.id}
            className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-purple-200/50 hover:shadow-purple-500/10 hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  {conversation.user.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-xl">{conversation.user}</h3>
                  <p className="text-sm text-purple-600 font-mono bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-xl inline-block shadow-md">{conversation.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-xl shadow-lg">
                  {getTypeIcon(conversation.type)}
                  <span className="text-sm text-purple-700 font-bold">
                    {conversation.type === 'auto' ? 'Auto Response' : 'Fallback'}
                  </span>
                </div>
                
                <div className={`px-4 py-2 rounded-xl text-sm font-bold shadow-lg ${getConfidenceColor(conversation.confidence)}`}>
                  {Math.round(conversation.confidence * 100)}% confidence
                </div>
                
                <span className="text-sm text-blue-700 bg-gradient-to-r from-blue-100 to-cyan-100 px-4 py-3 rounded-xl shadow-lg font-semibold">{conversation.timestamp}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border-l-4 border-blue-500 shadow-lg">
                <p className="text-sm font-bold text-blue-800 mb-2">Question:</p>
                <p className="text-gray-800 font-medium">{conversation.question}</p>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-l-4 border-purple-500 shadow-lg">
                <p className="text-sm font-bold text-purple-800 mb-2">Answer:</p>
                <p className="text-gray-800 font-medium">{conversation.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-8 rounded-3xl shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 transform">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl font-bold text-white">{conversations.filter(c => c.type === 'auto').length}</span>
            </div>
            <p className="text-white font-bold text-xl">Auto Responses</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-8 rounded-3xl shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 transform">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl font-bold text-white">{conversations.filter(c => c.type === 'fallback').length}</span>
            </div>
            <p className="text-white font-bold text-xl">Fallbacks</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 rounded-3xl shadow-2xl hover:shadow-emerald-500/25 hover:scale-105 transition-all duration-300 transform">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl font-bold text-white">
                {Math.round((conversations.reduce((acc, c) => acc + c.confidence, 0) / conversations.length) * 100)}%
              </span>
            </div>
            <p className="text-white font-bold text-xl">Avg Confidence</p>
          </div>
        </div>
      </div>
    </div>
  );
};
