export interface User {
    id: string;
    email: string;
    username: string;
    avatar: string | null;
    fullName: string;
    phoneNumber: string;
    role: "USER" | "ADMIN"; 
    createdAt: string; 
    chatIDs: string[];
    resetPasswordToken: string | null;
    resetPasswordExpires: string | null;
  }
  