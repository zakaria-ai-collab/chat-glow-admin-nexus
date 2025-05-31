
// Données d'exemple avec numéros marocains
export const moroccanUsers = [
  { 
    id: 1, 
    phone: '+212612345678', 
    name: 'Aicha Bennani', 
    tag: 'client', 
    firstContact: '2024-01-15', 
    lastMessage: '2024-01-20',
    totalMessages: 45
  },
  { 
    id: 2, 
    phone: '+212687654321', 
    name: 'Youssef El Fassi', 
    tag: 'prospect', 
    firstContact: '2024-01-10', 
    lastMessage: '2024-01-18',
    totalMessages: 12
  },
  { 
    id: 3, 
    phone: '+212645123789', 
    name: 'Fatima Zahra Alami', 
    tag: 'client', 
    firstContact: '2024-01-20', 
    lastMessage: '2024-01-22',
    totalMessages: 23
  },
  { 
    id: 4, 
    phone: '+212634567890', 
    name: 'Ahmed Tazi', 
    tag: 'test', 
    firstContact: '2024-01-12', 
    lastMessage: '2024-01-19',
    totalMessages: 8
  },
  { 
    id: 5, 
    phone: '+212698765432', 
    name: 'Khadija Berrada', 
    tag: 'client', 
    firstContact: '2024-01-08', 
    lastMessage: '2024-01-21',
    totalMessages: 67
  },
  { 
    id: 6, 
    phone: '+212656789012', 
    name: 'Omar Chakib', 
    tag: 'prospect', 
    firstContact: '2024-01-14', 
    lastMessage: '2024-01-17',
    totalMessages: 15
  },
  { 
    id: 7, 
    phone: '+212623456789', 
    name: 'Zineb Amrani', 
    tag: 'client', 
    firstContact: '2024-01-05', 
    lastMessage: '2024-01-23',
    totalMessages: 89
  },
  { 
    id: 8, 
    phone: '+212667890123', 
    name: 'Rachid Benali', 
    tag: 'test', 
    firstContact: '2024-01-18', 
    lastMessage: '2024-01-18',
    totalMessages: 3
  },
  { 
    id: 9, 
    phone: '+212689012345', 
    name: 'Laila Serghini', 
    tag: 'prospect', 
    firstContact: '2024-01-11', 
    lastMessage: '2024-01-16',
    totalMessages: 28
  },
  { 
    id: 10, 
    phone: '+212654321098', 
    name: 'Hassan Idrissi', 
    tag: 'client', 
    firstContact: '2024-01-07', 
    lastMessage: '2024-01-24',
    totalMessages: 156
  }
];

export const conversations = [
  {
    id: 1,
    phone: '+212612345678',
    name: 'Aicha Bennani',
    lastMessage: 'Merci pour les informations',
    timestamp: '2024-01-20 14:30',
    unread: 0
  },
  {
    id: 2,
    phone: '+212687654321',
    name: 'Youssef El Fassi',
    lastMessage: 'Je souhaite plus de détails',
    timestamp: '2024-01-18 09:15',
    unread: 2
  },
  {
    id: 3,
    phone: '+212645123789',
    name: 'Fatima Zahra Alami',
    lastMessage: 'Parfait, merci beaucoup',
    timestamp: '2024-01-22 16:45',
    unread: 0
  },
  {
    id: 4,
    phone: '+212634567890',
    name: 'Ahmed Tazi',
    lastMessage: 'Test message',
    timestamp: '2024-01-19 11:20',
    unread: 1
  },
  {
    id: 5,
    phone: '+212698765432',
    name: 'Khadija Berrada',
    lastMessage: 'Quand puis-je avoir une réponse?',
    timestamp: '2024-01-21 13:10',
    unread: 3
  }
];

export const documents = [
  {
    id: 1,
    name: 'Catalogue_Produits_2024.pdf',
    type: 'PDF',
    uploadDate: '2024-01-15',
    size: '2.4 MB',
    content: 'Catalogue complet des produits 2024 incluant les nouveaux articles, prix et spécifications techniques...'
  },
  {
    id: 2,
    name: 'Politique_Retour.pdf',
    type: 'PDF',
    uploadDate: '2024-01-10',
    size: '856 KB',
    content: 'Politique de retour et échange de la société. Conditions générales, délais et procédures...'
  },
  {
    id: 3,
    name: 'Manuel_Utilisateur.docx',
    type: 'DOCX',
    uploadDate: '2024-01-08',
    size: '1.2 MB',
    content: 'Manuel d\'utilisation complet avec instructions étape par étape...'
  }
];

export const exportHistory = [
  {
    id: 1,
    fileName: 'Utilisateurs_Export_2024-01-22.xlsx',
    type: 'Utilisateurs',
    format: 'Excel',
    exportDate: '2024-01-22',
    time: '14:30'
  },
  {
    id: 2,
    fileName: 'Conversations_Export_2024-01-21.pdf',
    type: 'Conversations',
    format: 'PDF',
    exportDate: '2024-01-21',
    time: '16:45'
  }
];
