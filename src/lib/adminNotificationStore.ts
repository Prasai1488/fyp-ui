import { create } from "zustand";
import apiRequest from "./apiRequest";

interface AdminNotification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  type?: string;
  entityId?: string;
}

interface AdminNotificationStore {
  notifications: AdminNotification[];
  unreadCount: number;
  fetch: () => Promise<void>;
  markAsRead: (id: string) => void;
  reset: () => void;
}

export const useAdminNotificationStore = create<AdminNotificationStore>((set) => ({
  notifications: [],
  unreadCount: 0,
  fetch: async () => {
    const res = await apiRequest.get("/admin/notifications");
    const unread = res.data.data.filter((n: AdminNotification) => !n.read);
    set({ notifications: res.data.data, unreadCount: unread.length });
  },
  markAsRead: (id: string) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
      unreadCount: state.unreadCount - 1,
    }));
  },
  reset: () => set({ notifications: [], unreadCount: 0 }),
}));
