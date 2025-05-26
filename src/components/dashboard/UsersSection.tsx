
import React, { useState } from 'react';
import { Download, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const users = [
  { id: 1, phone: '+1 (555) 123-4567', name: 'John Smith', status: 'active', firstContact: '2024-01-15', tag: 'client' },
  { id: 2, phone: '+1 (555) 234-5678', name: 'Sarah Johnson', status: 'inactive', firstContact: '2024-01-10', tag: 'prospect' },
  { id: 3, phone: '+1 (555) 345-6789', name: 'Mike Davis', status: 'active', firstContact: '2024-01-20', tag: 'client' },
  { id: 4, phone: '+1 (555) 456-7890', name: 'Emma Wilson', status: 'active', firstContact: '2024-01-08', tag: 'test' },
  { id: 5, phone: '+1 (555) 567-8901', name: 'David Brown', status: 'inactive', firstContact: '2024-01-05', tag: 'prospect' },
];

const tagColors = {
  client: 'bg-green-100 text-green-700 border-green-200',
  prospect: 'bg-blue-100 text-blue-700 border-blue-200',
  test: 'bg-purple-100 text-purple-700 border-purple-200',
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
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
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
              className="pl-10 pr-4 py-3 w-full bg-white/70 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all"
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
            <thead className="bg-gradient-to-r from-purple-50/50 to-blue-50/50 border-b border-purple-100/50">
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
                <tr key={user.id} className="border-b border-gray-100/50 hover:bg-purple-50/30 transition-colors">
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
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 rounded-xl border border-blue-200/50">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-700">{users.filter(u => u.tag === 'prospect').length}</p>
            <p className="text-blue-600 text-sm">Prospects</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-4 rounded-xl border border-purple-200/50">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-700">{users.filter(u => u.status === 'active').length}</p>
            <p className="text-purple-600 text-sm">Active Users</p>
          </div>
        </div>
      </div>
    </div>
  );
};
