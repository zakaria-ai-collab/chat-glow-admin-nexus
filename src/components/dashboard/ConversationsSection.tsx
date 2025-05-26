
import React, { useState } from 'react';
import { Search, Download, Filter, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const conversations = [
  {
    id: 1,
    user: 'John Smith',
    phone: '+1 (555) 123-4567',
    question: 'What are your business hours?',
    answer: 'Our business hours are Monday to Friday 9 AM to 6 PM, and Saturday 10 AM to 4 PM.',
    confidence: 0.95,
    type: 'auto',
    timestamp: '2024-01-25 14:30',
  },
  {
    id: 2,
    user: 'Sarah Johnson',
    phone: '+1 (555) 234-5678',
    question: 'Can I return a product after 30 days?',
    answer: 'I understand you have a question about returns. Let me connect you with our support team for detailed assistance.',
    confidence: 0.45,
    type: 'fallback',
    timestamp: '2024-01-25 13:15',
  },
  {
    id: 3,
    user: 'Mike Davis',
    phone: '+1 (555) 345-6789',
    question: 'How do I track my order?',
    answer: 'You can track your order using the tracking number sent to your email, or log into your account on our website.',
    confidence: 0.92,
    type: 'auto',
    timestamp: '2024-01-25 12:45',
  },
  {
    id: 4,
    user: 'Emma Wilson',
    phone: '+1 (555) 456-7890',
    question: 'Do you offer bulk discounts?',
    answer: 'Yes, we offer bulk discounts starting from orders of 50+ items. The discount ranges from 10% to 25% depending on quantity.',
    confidence: 0.88,
    type: 'auto',
    timestamp: '2024-01-25 11:20',
  },
];

export const ConversationsSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [userFilter, setUserFilter] = useState('all');

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600 bg-green-100';
    if (confidence >= 0.6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getTypeIcon = (type: string) => {
    return type === 'auto' ? (
      <Bot className="w-4 h-4 text-green-600" />
    ) : (
      <User className="w-4 h-4 text-orange-600" />
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
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Conversations
        </h2>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
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
              className="pl-10 pr-4 py-3 w-full bg-white/70 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all"
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
                <SelectItem value="john">John Smith</SelectItem>
                <SelectItem value="sarah">Sarah Johnson</SelectItem>
                <SelectItem value="mike">Mike Davis</SelectItem>
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
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold">
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
              <div className="bg-blue-50/50 p-4 rounded-xl border-l-4 border-blue-400">
                <p className="text-sm font-medium text-blue-800 mb-1">Question:</p>
                <p className="text-gray-700">{conversation.question}</p>
              </div>
              
              <div className="bg-green-50/50 p-4 rounded-xl border-l-4 border-green-400">
                <p className="text-sm font-medium text-green-800 mb-1">Answer:</p>
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
        <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 p-4 rounded-xl border border-orange-200/50">
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-700">{conversations.filter(c => c.type === 'fallback').length}</p>
            <p className="text-orange-600 text-sm">Fallbacks</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 rounded-xl border border-blue-200/50">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-700">
              {Math.round((conversations.reduce((acc, c) => acc + c.confidence, 0) / conversations.length) * 100)}%
            </p>
            <p className="text-blue-600 text-sm">Avg Confidence</p>
          </div>
        </div>
      </div>
    </div>
  );
};
