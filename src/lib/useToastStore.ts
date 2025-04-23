
import { create } from "zustand";

type Toast = {
  message: string;
  type: "success" | "error" | "info";
};

type ToastStore = {
  toast: Toast | null;
  setToast: (toast: Toast) => void;
  clearToast: () => void;
};

export const useToastStore = create<ToastStore>((set) => ({
  toast: null,
  setToast: (toast) => set({ toast }),
  clearToast: () => set({ toast: null }),
}));
