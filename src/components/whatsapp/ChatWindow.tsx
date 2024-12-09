import React from 'react';
import { format } from 'date-fns';
import { Send, Image, Paperclip, Smile } from 'lucide-react';
import clsx from 'clsx';
import type { WhatsAppMessage, WhatsAppContact } from '../../types/whatsapp';

interface ChatWindowProps {
  contact: WhatsAppContact;
  messages: WhatsAppMessage[];
}

export function ChatWindow({ contact, messages }: ChatWindowProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center">
        <img
          src={contact.profileImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop'}
          alt={contact.name}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h2 className="font-semibold">{contact.name}</h2>
          <p className="text-sm text-gray-500">
            {contact.status === 'online' ? 'Online' : 'Last seen ' + contact.lastSeen}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={clsx(
              'max-w-[70%] rounded-lg p-3',
              message.isOutgoing
                ? 'ml-auto bg-blue-500 text-white'
                : 'bg-white border border-gray-200'
            )}
          >
            <p>{message.content}</p>
            <div className={clsx(
              'text-xs mt-1',
              message.isOutgoing ? 'text-blue-100' : 'text-gray-500'
            )}>
              {format(new Date(message.timestamp), 'HH:mm')}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Smile className="w-5 h-5 text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Paperclip className="w-5 h-5 text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Image className="w-5 h-5 text-gray-500" />
          </button>
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
          />
          <button className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full text-white">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}