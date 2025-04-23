export interface User {
    id: string;
    username: string;
    avatar: string | null;
  }
  
  export interface Message {
    id: string;
    text: string;
    createdAt: string;
    userId: string;
    chatId: string;
  }
  
  export interface ChatData {
    id: string;
    messages: Message[];
    receiver: User;
    seenBy: string[];
    lastMessage?: string;
  }
  