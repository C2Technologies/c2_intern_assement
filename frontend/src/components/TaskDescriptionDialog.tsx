import React from "react";

interface TaskDescriptionDialogProps {
  title: string;
  description: string;
  onClose: () => void;
}

const TaskDescriptionDialog: React.FC<TaskDescriptionDialogProps> = ({ title, description, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h2 className="edit-task-title">{title}</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-content">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export { TaskDescriptionDialog };
