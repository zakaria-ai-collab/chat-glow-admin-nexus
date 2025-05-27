
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
    if (confidence >= 0.8) return 'text-green-600 bg-green-100';
    if (confidence >= 0.6) return 'text-green-500 bg-green-50';
    return 'text-green-700 bg-green-200';
  };

  const getTypeIcon = (type: string) => {
    return type === 'auto' ? (
      <Bot className="w-4 h-4 text-green-600" />
    ) : (
      <User className="w-4 h-4 text-green-500" />
    );
  };

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
          Conversations
        </h2>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" className="border-green-300 text-green-800 hover:bg-green-100">
            <Download className="w-4 h-4 mr-2" />
            Export JSON
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full bg-white/70 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-300 transition-all"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <Filter className="w-5 h-5 text-gray-500" />
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-40 bg-white/70 border-gray-200/50">
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
              <SelectTrigger className="w-40 bg-white/70 border-gray-200/50">
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
      <div className="space-y-4">
        {filteredConversations.map((conversation) => (
          <div
            key={conversation.id}
            className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 hover-scale"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {conversation.user.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{conversation.user}</h3>
                  <p className="text-sm text-gray-500 font-mono">{conversation.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(conversation.type)}
                  <span className="text-xs text-gray-500">
                    {conversation.type === 'auto' ? 'Auto Response' : 'Fallback'}
                  </span>
                </div>
                
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${getConfidenceColor(conversation.confidence)}`}>
                  {Math.round(conversation.confidence * 100)}% confidence
                </div>
                
                <span className="text-xs text-gray-500">{conversation.timestamp}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="bg-green-50/50 p-4 rounded-xl border-l-4 border-green-400">
                <p className="text-sm font-medium text-green-800 mb-1">Question:</p>
                <p className="text-gray-700">{conversation.question}</p>
              </div>
              
              <div className="bg-green-100/50 p-4 rounded-xl border-l-4 border-green-500">
                <p className="text-sm font-medium text-green-900 mb-1">Answer:</p>
                <p className="text-gray-700">{conversation.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-4 rounded-xl border border-green-200/50">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-700">{conversations.filter(c => c.type === 'auto').length}</p>
            <p className="text-green-600 text-sm">Auto Responses</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-100 to-green-200/50 p-4 rounded-xl border border-green-300/50">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-800">{conversations.filter(c => c.type === 'fallback').length}</p>
            <p className="text-green-700 text-sm">Fallbacks</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-200 to-green-300/50 p-4 rounded-xl border border-green-400/50">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-900">
              {Math.round((conversations.reduce((acc, c) => acc + c.confidence, 0) / conversations.length) * 100)}%
            </p>
            <p className="text-green-800 text-sm">Avg Confidence</p>
          </div>
        </div>
      </div>
    </div>
  );
};
