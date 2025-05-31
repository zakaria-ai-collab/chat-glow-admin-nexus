
import React, { useState } from 'react';
import { Search, Filter, Edit2, MessageCircle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { moroccanUsers } from '@/data/mockData';

const tagColors = {
  client: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  prospect: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  test: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
};

export const UsersSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('all');
  const [editingUser, setEditingUser] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [users, setUsers] = useState(moroccanUsers);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.phone.includes(searchTerm);
    const matchesTag = filterTag === 'all' || user.tag === filterTag;
    return matchesSearch && matchesTag;
  });

  const handleEditName = (userId: number, currentName: string) => {
    setEditingUser(userId);
    setEditName(currentName);
  };

  const handleSaveName = () => {
    if (editingUser) {
      setUsers(users.map(user => 
        user.id === editingUser ? { ...user, name: editName } : user
      ));
    }
    setEditingUser(null);
    setEditName('');
  };

  const handleTagChange = (userId: number, newTag: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, tag: newTag as 'client' | 'prospect' | 'test' } : user
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Utilisateurs & Clients
        </h2>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Rechercher par nom ou numéro..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={filterTag} onValueChange={setFilterTag}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrer par tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les tags</SelectItem>
              <SelectItem value="client">Client</SelectItem>
              <SelectItem value="prospect">Prospect</SelectItem>
              <SelectItem value="test">Test</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-900 dark:text-white">Numéro WhatsApp</th>
                <th className="text-left p-4 font-semibold text-gray-900 dark:text-white">Nom</th>
                <th className="text-left p-4 font-semibold text-gray-900 dark:text-white">Tag</th>
                <th className="text-left p-4 font-semibold text-gray-900 dark:text-white">Premier contact</th>
                <th className="text-left p-4 font-semibold text-gray-900 dark:text-white">Dernier message</th>
                <th className="text-left p-4 font-semibold text-gray-900 dark:text-white">Total messages</th>
                <th className="text-left p-4 font-semibold text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="p-4">
                    <button 
                      className="text-blue-600 hover:text-blue-800 font-mono text-base"
                      onClick={() => console.log('Voir messages pour', user.phone)}
                    >
                      {user.phone}
                    </button>
                  </td>
                  <td className="p-4">
                    {editingUser === user.id ? (
                      <div className="flex items-center gap-2">
                        <Input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="h-8"
                          placeholder="Entrer le nom"
                        />
                        <Button size="sm" onClick={handleSaveName}>Sauver</Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingUser(null)}>Annuler</Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-900 dark:text-white text-base">
                          {user.name || 'Nom non défini'}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditName(user.id, user.name)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    <Select value={user.tag} onValueChange={(value) => handleTagChange(user.id, value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="client">Client</SelectItem>
                        <SelectItem value="prospect">Prospect</SelectItem>
                        <SelectItem value="test">Test</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">
                    {new Date(user.firstContact).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">
                    {new Date(user.lastMessage).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="p-4 text-gray-900 dark:text-white font-semibold">
                    {user.totalMessages}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{users.filter(u => u.tag === 'client').length}</div>
            <div className="text-gray-600 dark:text-gray-400">Clients</div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{users.filter(u => u.tag === 'prospect').length}</div>
            <div className="text-gray-600 dark:text-gray-400">Prospects</div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-600">{users.filter(u => u.tag === 'test').length}</div>
            <div className="text-gray-600 dark:text-gray-400">Utilisateurs Test</div>
          </div>
        </div>
      </div>
    </div>
  );
};
