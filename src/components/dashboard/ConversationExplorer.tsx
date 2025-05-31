
import React, { useState } from 'react';
import { Search, User, MessageSquare, Clock, AlertCircle, UserCheck, Flag, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const conversations = [
  {
    id: 1,
    user: { name: 'Youssef Alami', phone: '0612345678' },
    lastMessage: 'Pouvez-vous me donner le prix du produit X?',
    timestamp: '14:30',
    unread: 2,
    status: 'active',
    confidence: 0.95
  },
  {
    id: 2,
    user: { name: 'Fatima Bennani', phone: '0687654321' },
    lastMessage: 'Merci pour votre aide!',
    timestamp: '13:45',
    unread: 0,
    status: 'resolved',
    confidence: 0.89
  },
  {
    id: 3,
    user: { name: 'Ahmed Mokhtar', phone: '0645123789' },
    lastMessage: 'Je ne comprends pas votre réponse',
    timestamp: '12:20',
    unread: 1,
    status: 'needs_attention',
    confidence: 0.34
  },
];

const messages = [
  {
    id: 1,
    sender: 'user',
    content: 'Salut! Pouvez-vous me donner le prix du produit X?',
    timestamp: '14:25',
    confidence: null
  },
  {
    id: 2,
    sender: 'assistant',
    content: 'Bonjour! Le produit X coûte 299 DH. Voulez-vous plus d\'informations sur ses caractéristiques?',
    timestamp: '14:26',
    confidence: 0.95
  },
  {
    id: 3,
    sender: 'user',
    content: 'Oui, j\'aimerais en savoir plus sur la garantie',
    timestamp: '14:28',
    confidence: null
  },
  {
    id: 4,
    sender: 'assistant',
    content: 'Ce produit bénéficie d\'une garantie de 2 ans constructeur. La garantie couvre les défauts de fabrication.',
    timestamp: '14:29',
    confidence: 0.92
  },
  {
    id: 5,
    sender: 'user',
    content: 'Parfait, comment puis-je le commander?',
    timestamp: '14:30',
    confidence: null
  },
];

export const ConversationsSection = () => {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = conversations.filter(conv =>
    conv.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.user.phone.includes(searchTerm) ||
    conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'resolved': return 'bg-blue-500';
      case 'needs_attention': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence > 0.8) return 'text-green-600';
    if (confidence > 0.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      {/* Sidebar - Conversations List */}
      <div className="w-80 bg-white/90 backdrop-blur-lg border-r border-purple-200/50 shadow-2xl">
        <div className="p-6 border-b border-purple-200/50">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Conversations
          </h2>
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-300/50 focus:border-purple-400 transition-all"
            />
          </div>
        </div>

        <ScrollArea className="h-full">
          <div className="p-4 space-y-3">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-102 ${
                  selectedConversation.id === conversation.id
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-400 shadow-lg'
                    : 'bg-white/70 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 border-2 border-transparent'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{conversation.user.name}</div>
                      <div className="text-sm text-gray-600">{conversation.user.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(conversation.status)}`}></div>
                    {conversation.unread > 0 && (
                      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-2 py-1 rounded-full">
                        {conversation.unread}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-sm text-gray-700 truncate mb-2">{conversation.lastMessage}</div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">{conversation.timestamp}</span>
                  {conversation.confidence && (
                    <span className={`font-semibold ${getConfidenceColor(conversation.confidence)}`}>
                      {(conversation.confidence * 100).toFixed(0)}%
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white/60 backdrop-blur-sm">
        {/* Chat Header */}
        <div className="p-6 border-b border-purple-200/50 bg-white/90 backdrop-blur-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{selectedConversation.user.name}</h3>
                <p className="text-gray-600">{selectedConversation.user.phone}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
                <UserCheck className="w-4 h-4 mr-2" />
                Assigner agent
              </Button>
              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                <Eye className="w-4 h-4 mr-2" />
                Voir profil
              </Button>
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
                <Flag className="w-4 h-4 mr-2" />
                Signaler
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-6 py-4 rounded-3xl shadow-lg ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : message.confidence && message.confidence < 0.5
                      ? 'bg-gradient-to-r from-red-100 to-red-200 border-2 border-red-300 text-red-800'
                      : 'bg-white/90 backdrop-blur-lg border-2 border-gray-200 text-gray-800'
                  }`}
                >
                  <div className="mb-2">{message.content}</div>
                  <div className={`text-xs flex items-center justify-between ${
                    message.sender === 'user' ? 'text-purple-100' : 'text-gray-500'
                  }`}>
                    <span>{message.timestamp}</span>
                    {message.confidence && (
                      <div className="flex items-center gap-1">
                        {message.confidence < 0.5 && <AlertCircle className="w-3 h-3" />}
                        <span className={getConfidenceColor(message.confidence)}>
                          {(message.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Quick Actions */}
        <div className="p-6 border-t border-purple-200/50 bg-white/90 backdrop-blur-lg">
          <div className="flex items-center gap-3">
            <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
              Résoudre
            </Button>
            <Button variant="outline" className="border-2 border-gray-300 hover:bg-gray-50">
              Marquer comme spam
            </Button>
            <Button variant="outline" className="border-2 border-gray-300 hover:bg-gray-50">
              Transférer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
