
import { useEffect } from "react";
import { useToastStore } from "../../lib/useToastStore";
import "./toast.scss";

const Toast = () => {
  const { toast, clearToast } = useToastStore();

  useEffect(() => {
    if (toast) {
      const timeout = setTimeout(() => {
        clearToast();
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [toast, clearToast]);

  if (!toast) return null;

  return (
    <div className={`toast ${toast.type}`}>
      {toast.message}
    </div>
  );
};

export default Toast;
