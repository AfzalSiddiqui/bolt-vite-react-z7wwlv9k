import React from 'react';
import { format } from 'date-fns';
import { Check, CheckCheck } from 'lucide-react';
import clsx from 'clsx';
import type { WhatsAppContact, WhatsAppMessage } from '../../types/whatsapp';

interface ContactsListProps {
  contacts: WhatsAppContact[];
  lastMessages: Record<string, WhatsAppMessage>;
  onSelectContact: (contact: WhatsAppContact) => void;
  selectedContactId?: string;
}

export function ContactsList({ contacts, lastMessages, onSelectContact, selectedContactId }: ContactsListProps) {
  return (
    <div className="bg-white border-r border-gray-200 w-80">
      <div className="p-4 border-b border-gray-200">
        <input
          type="text"
          placeholder="Search contacts..."
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="overflow-y-auto h-[calc(100vh-8rem)]">
        {contacts.map((contact) => {
          const lastMessage = lastMessages[contact.id];
          return (
            <button
              key={contact.id}
              onClick={() => onSelectContact(contact)}
              className={clsx(
                'w-full p-4 flex items-center gap-3 hover:bg-gray-50 border-b border-gray-100',
                selectedContactId === contact.id && 'bg-blue-50'
              )}
            >
              <img
                src={contact.profileImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop'}
                alt={contact.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium truncate">{contact.name}</h3>
                  {lastMessage && (
                    <span className="text-xs text-gray-500">
                      {format(new Date(lastMessage.timestamp), 'HH:mm')}
                    </span>
                  )}
                </div>
                {lastMessage && (
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    {lastMessage.isOutgoing && (
                      <span className="text-blue-500">
                        {lastMessage.status === 'read' ? <CheckCheck className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                      </span>
                    )}
                    <p className="truncate">{lastMessage.content}</p>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}