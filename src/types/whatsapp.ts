export interface WhatsAppContact {
  id: string;
  name: string;
  phoneNumber: string;
  profileImage?: string;
  lastSeen?: string;
  status: 'online' | 'offline';
}

export interface WhatsAppMessage {
  id: string;
  contactId: string;
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'document';
  isOutgoing: boolean;
}