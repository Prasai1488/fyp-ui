import { create } from "zustand";

interface ConfirmDialogState {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: (() => void) | null;
  openDialog: (title: string, message: string, onConfirm: () => void) => void;
  closeDialog: () => void;
}

export const useConfirmDialogStore = create<ConfirmDialogState>((set) => ({
  isOpen: false,
  title: "",
  message: "",
  onConfirm: null,
  openDialog: (title, message, onConfirm) =>
    set({ isOpen: true, title, message, onConfirm }),
  closeDialog: () =>
    set({ isOpen: false, title: "", message: "", onConfirm: null }),
}));
