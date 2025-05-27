
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
  client: 'bg-green-50 text-green-700 border-green-200',
  prospect: 'bg-green-100 text-green-800 border-green-300',
  test: 'bg-green-200 text-green-900 border-green-400',
};

const statusColors = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-white text-gray-600 border border-gray-200',
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
        <h2 className="text-4xl font-bold text-green-800">
          Users & Clients
        </h2>
        <Button className="bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <Download className="w-4 h-4 mr-2" />
          Export to Excel
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white p-8 rounded-3xl shadow-lg border border-green-100">
        <div className="flex flex-col md:flex-row gap-6 md:items-center">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500" />
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-4 w-full bg-green-50 border border-green-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-green-600" />
            <Select value={filterTag} onValueChange={setFilterTag}>
              <SelectTrigger className="w-48 bg-green-50 border-green-200 rounded-2xl">
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
      <div className="bg-white rounded-3xl shadow-lg border border-green-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-green-50 border-b border-green-100">
              <tr>
                <th className="text-left p-6 font-semibold text-green-800">WhatsApp Number</th>
                <th className="text-left p-6 font-semibold text-green-800">Name</th>
                <th className="text-left p-6 font-semibold text-green-800">Status</th>
                <th className="text-left p-6 font-semibold text-green-800">First Contact</th>
                <th className="text-left p-6 font-semibold text-green-800">Tag</th>
                <th className="text-left p-6 font-semibold text-green-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.id} className="border-b border-green-50 hover:bg-green-25 transition-colors">
                  <td className="p-6">
                    <span className="font-mono text-green-700 bg-green-50 px-3 py-1 rounded-lg">{user.phone}</span>
                  </td>
                  <td className="p-6">
                    <span className="font-medium text-green-900">{user.name}</span>
                  </td>
                  <td className="p-6">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${statusColors[user.status]}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-6">
                    <span className="text-green-700">{new Date(user.firstContact).toLocaleDateString()}</span>
                  </td>
                  <td className="p-6">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium border ${tagColors[user.tag]}`}>
                      {user.tag.charAt(0).toUpperCase() + user.tag.slice(1)}
                    </span>
                  </td>
                  <td className="p-6">
                    <Select defaultValue={user.tag}>
                      <SelectTrigger className="w-36 h-10 text-sm bg-green-50 border-green-200 rounded-xl">
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
        <div className="bg-white p-8 rounded-3xl border-2 border-green-100 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold text-green-700">{users.filter(u => u.tag === 'client').length}</span>
            </div>
            <p className="text-green-800 font-semibold">Clients</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl border-2 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold text-green-800">{users.filter(u => u.tag === 'prospect').length}</span>
            </div>
            <p className="text-green-900 font-semibold">Prospects</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl border-2 border-green-300 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold text-green-900">{users.filter(u => u.status === 'active').length}</span>
            </div>
            <p className="text-green-900 font-semibold">Active Users</p>
          </div>
        </div>
      </div>
    </div>
  );
};
