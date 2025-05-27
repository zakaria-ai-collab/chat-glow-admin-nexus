
import React, { useState } from 'react';
import { Download, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const users = [
  { id: 1, phone: '0612345678', name: 'Ahmed Bennani', status: 'active', firstContact: '2024-01-15', tag: 'client' },
  { id: 2, phone: '0687654321', name: 'Fatima El Alami', status: 'inactive', firstContact: '2024-01-10', tag: 'prospect' },
  { id: 3, phone: '0645123789', name: 'Youssef Mokhtar', status: 'active', firstContact: '2024-01-20', tag: 'client' },
];

const tagColors = {
  client: 'bg-green-100 text-green-700 border-green-200',
  prospect: 'bg-green-50 text-green-600 border-green-150',
  test: 'bg-green-200 text-green-800 border-green-300',
};

const statusColors = {
  active: 'bg-emerald-100 text-emerald-700',
  inactive: 'bg-gray-100 text-gray-700',
};

export const UsersSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.phone.includes(searchTerm);
    const matchesTag = filterTag === 'all' || user.tag === filterTag;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
          Users & Clients
        </h2>
        <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg">
          <Download className="w-4 h-4 mr-2" />
          Export to Excel
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50">
        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full bg-white/70 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-300 transition-all"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <Filter className="w-5 h-5 text-gray-500" />
            <Select value={filterTag} onValueChange={setFilterTag}>
              <SelectTrigger className="w-40 bg-white/70 border-gray-200/50">
                <SelectValue placeholder="Filter by tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tags</SelectItem>
                <SelectItem value="client">Client</SelectItem>
                <SelectItem value="prospect">Prospect</SelectItem>
                <SelectItem value="test">Test</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-green-50/50 to-green-100/50 border-b border-green-100/50">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-700">WhatsApp Number</th>
                <th className="text-left p-4 font-semibold text-gray-700">Name</th>
                <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                <th className="text-left p-4 font-semibold text-gray-700">First Contact</th>
                <th className="text-left p-4 font-semibold text-gray-700">Tag</th>
                <th className="text-left p-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.id} className="border-b border-gray-100/50 hover:bg-green-50/30 transition-colors">
                  <td className="p-4">
                    <span className="font-mono text-gray-600">{user.phone}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-gray-800">{user.name}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[user.status]}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-gray-600">{new Date(user.firstContact).toLocaleDateString()}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${tagColors[user.tag]}`}>
                      {user.tag.charAt(0).toUpperCase() + user.tag.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">
                    <Select defaultValue={user.tag}>
                      <SelectTrigger className="w-32 h-8 text-xs bg-white/70 border-gray-200/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="client">Client</SelectItem>
                        <SelectItem value="prospect">Prospect</SelectItem>
                        <SelectItem value="test">Test</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-4 rounded-xl border border-green-200/50">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-700">{users.filter(u => u.tag === 'client').length}</p>
            <p className="text-green-600 text-sm">Clients</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-100 to-green-200/50 p-4 rounded-xl border border-green-300/50">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-800">{users.filter(u => u.tag === 'prospect').length}</p>
            <p className="text-green-700 text-sm">Prospects</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-200 to-green-300/50 p-4 rounded-xl border border-green-400/50">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-900">{users.filter(u => u.status === 'active').length}</p>
            <p className="text-green-800 text-sm">Active Users</p>
          </div>
        </div>
      </div>
    </div>
  );
};
