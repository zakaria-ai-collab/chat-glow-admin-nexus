
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
  client: 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-emerald-300',
  prospect: 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border-blue-300',
  test: 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-300',
};

const statusColors = {
  active: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white',
  inactive: 'bg-gradient-to-r from-gray-400 to-gray-500 text-white',
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
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Users & Clients
        </h2>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 px-8 py-3 rounded-2xl">
          <Download className="w-5 h-5 mr-3" />
          Export to Excel
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-purple-200/50">
        <div className="flex flex-col md:flex-row gap-6 md:items-center">
          <div className="relative flex-1">
            <Search className="w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-14 pr-4 py-4 w-full bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-300/50 focus:border-purple-400 transition-all shadow-lg"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <Filter className="w-6 h-6 text-purple-600" />
            <Select value={filterTag} onValueChange={setFilterTag}>
              <SelectTrigger className="w-48 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl shadow-lg">
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
      <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-blue-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <tr>
                <th className="text-left p-6 font-bold">WhatsApp Number</th>
                <th className="text-left p-6 font-bold">Name</th>
                <th className="text-left p-6 font-bold">Status</th>
                <th className="text-left p-6 font-bold">First Contact</th>
                <th className="text-left p-6 font-bold">Tag</th>
                <th className="text-left p-6 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.id} className="border-b border-purple-100 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300">
                  <td className="p-6">
                    <span className="font-mono text-purple-700 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-xl shadow-md">{user.phone}</span>
                  </td>
                  <td className="p-6">
                    <span className="font-bold text-gray-800 text-lg">{user.name}</span>
                  </td>
                  <td className="p-6">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${statusColors[user.status]}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-6">
                    <span className="text-gray-700 font-semibold">{new Date(user.firstContact).toLocaleDateString()}</span>
                  </td>
                  <td className="p-6">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold border-2 shadow-lg ${tagColors[user.tag]}`}>
                      {user.tag.charAt(0).toUpperCase() + user.tag.slice(1)}
                    </span>
                  </td>
                  <td className="p-6">
                    <Select defaultValue={user.tag}>
                      <SelectTrigger className="w-36 h-10 text-sm bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl shadow-md">
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-8 rounded-3xl shadow-2xl hover:shadow-emerald-500/25 hover:scale-105 transition-all duration-300 transform">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl font-bold text-white">{users.filter(u => u.tag === 'client').length}</span>
            </div>
            <p className="text-white font-bold text-xl">Clients</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-8 rounded-3xl shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 transform">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl font-bold text-white">{users.filter(u => u.tag === 'prospect').length}</span>
            </div>
            <p className="text-white font-bold text-xl">Prospects</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-8 rounded-3xl shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 transform">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl font-bold text-white">{users.filter(u => u.status === 'active').length}</span>
            </div>
            <p className="text-white font-bold text-xl">Active Users</p>
          </div>
        </div>
      </div>
    </div>
  );
};
