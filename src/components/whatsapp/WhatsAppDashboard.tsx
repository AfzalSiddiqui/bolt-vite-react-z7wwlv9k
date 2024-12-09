import React, { useState } from 'react';
import { ContactsList } from './ContactsList';
import { ChatWindow } from './ChatWindow';
import type { WhatsAppContact, WhatsAppMessage } from '../../types/whatsapp';

const mockContacts: WhatsAppContact[] = [
  {
    id: '1',
    name: 'John Smith',
    phoneNumber: '+1234567890',
    status: 'online',
    lastSeen: '2024-03-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    phoneNumber: '+1987654321',
    status: 'offline',
    lastSeen: '2024-03-15T09:30:00Z'
  }
];

const mockMessages: Record<string, WhatsAppMessage[]> = {
  '1': [
    {
      id: '1',
      contactId: '1',
      content: 'Hi, I need help with my recent order',
      timestamp: '2024-03-15T10:00:00Z',
      status: 'read',
      type: 'text',
      isOutgoing: false
    },
    {
      id: '2',
      contactId: '1',
      content: 'Of course! I can help you with that. What seems to be the issue?',
      timestamp: '2024-03-15T10:01:00Z',
      status: 'read',
      type: 'text',
      isOutgoing: true
    }
  ]
};

const mockLastMessages: Record<string, WhatsAppMessage> = {
  '1': mockMessages['1'][mockMessages['1'].length - 1],
  '2': {
    id: '3',
    contactId: '2',
    content: 'Thanks for your help!',
    timestamp: '2024-03-15T09:30:00Z',
    status: 'read',
    type: 'text',
    isOutgoing: false
  }
};

export function WhatsAppDashboard() {
  const [selectedContact, setSelectedContact] = useState<WhatsAppContact | null>(null);

  return (
    <div className="h-[calc(100vh-2rem)] bg-white rounded-lg shadow-sm border border-gray-200 flex">
      <ContactsList
        contacts={mockContacts}
        lastMessages={mockLastMessages}
        onSelectContact={setSelectedContact}
        selectedContactId={selectedContact?.id}
      />
      {selectedContact ? (
        <div className="flex-1">
          <ChatWindow
            contact={selectedContact}
            messages={mockMessages[selectedContact.id] || []}
          />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select a contact to start chatting
        </div>
      )}
    </div>
  );
}