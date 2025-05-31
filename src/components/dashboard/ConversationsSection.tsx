
import React, { useState } from 'react';
import { Search, MessageCircle, User, Clock, Filter, Calendar, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const conversations = [
  {
    id: 1,
    phone: '+212612345678',
    name: 'Aicha Bennani',
    lastMessage: 'Bonjour, avez-vous des informations sur les prix?',
    timestamp: '2024-01-22 14:30',
    isFromUser: true,
    unreadCount: 2,
    responseType: 'ia'
  },
  {
    id: 2,
    phone: '+212687654321',
    name: 'Youssef El Fassi',
    lastMessage: 'Merci pour votre aide!',
    timestamp: '2024-01-22 12:15',
    isFromUser: true,
    unreadCount: 0,
    responseType: 'ia'
  },
  {
    id: 3,
    phone: '+212645123789',
    name: 'Fatima Zahra Alami',
    lastMessage: 'Assistant: Voici les informations demandées...',
    timestamp: '2024-01-22 10:45',
    isFromUser: false,
    unreadCount: 1,
    responseType: 'fallback'
  }
];

const messageHistory = [
  { id: 1, content: 'Bonjour, comment allez-vous?', isFromUser: true, timestamp: '10:30' },
  { id: 2, content: 'Bonjour! Je vais bien, merci. Comment puis-je vous aider aujourd\'hui?', isFromUser: false, timestamp: '10:31' },
  { id: 3, content: 'J\'aimerais avoir des informations sur vos produits', isFromUser: true, timestamp: '10:32' },
  { id: 4, content: 'Bien sûr! Voici notre catalogue de produits...', isFromUser: false, timestamp: '10:33', isLowConfidence: true },
];

export const ConversationsSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [dateFilter, setDateFilter] = useState('all');
  const [responseTypeFilter, setResponseTypeFilter] = useState('all');
  const [userFilter, setUserFilter] = useState('');

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUser = conv.name.toLowerCase().includes(userFilter.toLowerCase()) || 
                       conv.phone.includes(userFilter);
    const matchesResponseType = responseTypeFilter === 'all' || conv.responseType === responseTypeFilter;
    
    return matchesSearch && matchesUser && matchesResponseType;
  });

  const handleSelectConversation = (convId: number) => {
    setSelectedConversation(convId);
  };

  const handleExport = () => {
    console.log('Exporting conversations with filters:', { searchTerm, dateFilter, responseTypeFilter, userFilter });
  };

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Conversations
        </h2>
        {filteredConversations.length > 0 && (
          <Button onClick={handleExport} className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Rechercher par mot-clé..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="relative">
            <User className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Nom ou numéro..."
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger>
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filtrer par date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les dates</SelectItem>
              <SelectItem value="today">Aujourd'hui</SelectItem>
              <SelectItem value="week">Cette semaine</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
            </SelectContent>
          </Select>

          <Select value={responseTypeFilter} onValueChange={setResponseTypeFilter}>
            <SelectTrigger>
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Type de réponse" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="ia">Réponse IA</SelectItem>
              <SelectItem value="fallback">Fallback</SelectItem>
              <SelectItem value="manuel">Manuel</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Conversations List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Conversations ({filteredConversations.length})
            </h3>
          </div>
          
          <div className="overflow-y-auto h-full">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => handleSelectConversation(conversation.id)}
                className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  selectedConversation === conversation.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {conversation.name || conversation.phone}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        conversation.responseType === 'ia' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300' :
                        conversation.responseType === 'fallback' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300' :
                        'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300'
                      }`}>
                        {conversation.responseType === 'ia' ? 'IA' : 
                         conversation.responseType === 'fallback' ? 'Fallback' : 'Manuel'}
                      </span>
                    </div>
                    {conversation.name && (
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        {conversation.phone}
                      </div>
                    )}
                    <div className="text-sm text-gray-600 dark:text-gray-300 truncate">
                      {conversation.lastMessage}
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="w-3 h-3" />
                      {conversation.timestamp}
                    </div>
                  </div>
                  {conversation.unreadCount > 0 && (
                    <div className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {conversation.unreadCount}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Thread */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col">
          {selectedConv ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {selectedConv.name || selectedConv.phone}
                    </h3>
                    {selectedConv.name && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">{selectedConv.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messageHistory.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isFromUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isFromUser
                          ? 'bg-blue-600 text-white'
                          : `bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white ${
                              message.isLowConfidence ? 'border-l-4 border-yellow-500' : ''
                            }`
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.isFromUser ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {message.timestamp}
                      </p>
                      {message.isLowConfidence && (
                        <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                          Réponse de faible confiance
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Assigner à un agent</Button>
                  <Button size="sm" variant="outline">Résoudre</Button>
                  <Button size="sm" variant="outline">Marquer comme spam</Button>
                  <Button size="sm" variant="outline">Voir le profil</Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">Sélectionnez une conversation pour voir les messages</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
