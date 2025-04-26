import "./confirmDialog.scss";
import { useConfirmDialogStore } from "../../lib/useConfirmDialogStore";

const ConfirmDialog = () => {
  const { isOpen, title, message, onConfirm, closeDialog } = useConfirmDialogStore();

  if (!isOpen) return null;

  return (
    <div className="confirmOverlay">
      <div className="confirmBox">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="actions">
          <button className="cancel" onClick={closeDialog}>Cancel</button>
          <button
            className="confirm"
            onClick={() => {
              if (onConfirm) onConfirm();
              closeDialog();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
