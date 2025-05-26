
import React, { useState } from 'react';
import { FileText, Upload, Trash2, RefreshCw, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const documents = [
  {
    id: 1,
    fileName: 'Product_Catalog_2024.pdf',
    dateAdded: '2024-01-20',
    status: 'indexed',
    size: '2.4 MB',
    type: 'PDF'
  },
  {
    id: 2,
    fileName: 'FAQ_Customer_Support.docx',
    dateAdded: '2024-01-18',
    status: 'processing',
    size: '1.1 MB',
    type: 'DOCX'
  },
  {
    id: 3,
    fileName: 'Return_Policy.txt',
    dateAdded: '2024-01-15',
    status: 'indexed',
    size: '45 KB',
    type: 'TXT'
  },
  {
    id: 4,
    fileName: 'Business_Hours.md',
    dateAdded: '2024-01-12',
    status: 'error',
    size: '12 KB',
    type: 'MD'
  },
  {
    id: 5,
    fileName: 'Shipping_Information.pdf',
    dateAdded: '2024-01-10',
    status: 'indexed',
    size: '890 KB',
    type: 'PDF'
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'indexed':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'processing':
      return <Clock className="w-5 h-5 text-yellow-500" />;
    case 'error':
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    default:
      return <FileText className="w-5 h-5 text-gray-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'indexed':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'processing':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'error':
      return 'bg-red-100 text-red-700 border-red-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const getFileTypeColor = (type: string) => {
  switch (type) {
    case 'PDF':
      return 'bg-red-100 text-red-700';
    case 'DOCX':
      return 'bg-blue-100 text-blue-700';
    case 'TXT':
      return 'bg-gray-100 text-gray-700';
    case 'MD':
      return 'bg-purple-100 text-purple-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export const DocumentsSection = () => {
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);

  const toggleFileSelection = (id: number) => {
    setSelectedFiles(prev => 
      prev.includes(id) ? prev.filter(fileId => fileId !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Documents Management
        </h2>
        <div className="flex space-x-3">
          <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg">
            <Upload className="w-4 h-4 mr-2" />
            Add Document
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg">
            <RefreshCw className="w-4 h-4 mr-2" />
            Re-index All
          </Button>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="bg-gradient-to-br from-blue-50/50 to-purple-50/50 border-2 border-dashed border-blue-300/50 rounded-2xl p-8 text-center hover:border-purple-400/50 transition-all duration-300">
        <Upload className="w-12 h-12 text-blue-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Upload New Documents</h3>
        <p className="text-gray-500 mb-4">Drag and drop files here, or click to browse</p>
        <p className="text-sm text-gray-400">Supported formats: PDF, DOCX, TXT, MD (Max 10MB)</p>
      </div>

      {/* Document Actions */}
      {selectedFiles.length > 0 && (
        <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-200/50">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {selectedFiles.length} document(s) selected
            </span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                <Trash2 className="w-4 h-4 mr-1" />
                Delete Selected
              </Button>
              <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                <RefreshCw className="w-4 h-4 mr-1" />
                Re-index Selected
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Documents Table */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-50/50 to-blue-50/50 border-b border-purple-100/50">
              <tr>
                <th className="text-left p-4">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    checked={selectedFiles.length === documents.length}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedFiles(documents.map(d => d.id));
                      } else {
                        setSelectedFiles([]);
                      }
                    }}
                  />
                </th>
                <th className="text-left p-4 font-semibold text-gray-700">File Name</th>
                <th className="text-left p-4 font-semibold text-gray-700">Type</th>
                <th className="text-left p-4 font-semibold text-gray-700">Size</th>
                <th className="text-left p-4 font-semibold text-gray-700">Date Added</th>
                <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                <th className="text-left p-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr 
                  key={doc.id} 
                  className="border-b border-gray-100/50 hover:bg-purple-50/30 transition-colors"
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      checked={selectedFiles.includes(doc.id)}
                      onChange={() => toggleFileSelection(doc.id)}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <span className="font-medium text-gray-800">{doc.fileName}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getFileTypeColor(doc.type)}`}>
                      {doc.type}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-gray-600 text-sm">{doc.size}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-gray-600">{new Date(doc.dateAdded).toLocaleDateString()}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(doc.status)}
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(doc.status)}`}>
                        {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                        <RefreshCw className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                        <Trash2 className="w-3 h-3" />
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-4 rounded-xl border border-green-200/50">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-700">{documents.filter(d => d.status === 'indexed').length}</p>
            <p className="text-green-600 text-sm">Indexed</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 p-4 rounded-xl border border-yellow-200/50">
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-700">{documents.filter(d => d.status === 'processing').length}</p>
            <p className="text-yellow-600 text-sm">Processing</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100/50 p-4 rounded-xl border border-red-200/50">
          <div className="text-center">
            <p className="text-2xl font-bold text-red-700">{documents.filter(d => d.status === 'error').length}</p>
            <p className="text-red-600 text-sm">Errors</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 rounded-xl border border-blue-200/50">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-700">{documents.length}</p>
            <p className="text-blue-600 text-sm">Total Documents</p>
          </div>
        </div>
      </div>
    </div>
  );
};
