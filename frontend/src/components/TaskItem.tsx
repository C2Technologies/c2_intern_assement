import { useState } from "react";
import { TaskDescriptionDialog } from "./TaskDescriptionDialog";

interface TaskDetails {
  title: string;
  description: string;
  completed: boolean;
  handleStatusChange: () => void;
  handleTaskDeletion: () => void;
  handleTaskEdit: () => void;
}

const TaskItem = ({
  title,
  description,
  completed,
  handleStatusChange,
  handleTaskDeletion,
  handleTaskEdit,
}: TaskDetails) => {
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const toggleDialog = () => {
    setShowDialog(!showDialog);
  };

  return (
    <div className="task-container">
      <div className="task-left">
        <label className="custom-checkbox">
          <input
            type="checkbox"
            name="completionStatus"
            checked={completed}
            onChange={handleStatusChange}
          />
          <span></span>
        </label>
        <p className="task-name">{title}</p>
      </div>
      <div className="task-right">
        <button onClick={toggleDialog} className="expand-btn">
          <img
            src={`public/images/${
              showDialog ? "chevron-up" : "chevron-down"
            }.svg`}
            alt={showDialog ? "collapse" : "expand"}
          />
        </button>
        <button onClick={handleTaskEdit} className="edit-btn">
          <img src="public/images/pen.svg" alt="edit icon" />
        </button>
        <button onClick={handleTaskDeletion} className="delete-btn">
          <img src="public/images/icons8-trash-1-dark.svg" alt="delete icon" />
        </button>
      </div>
      {showDialog && description && (
        <TaskDescriptionDialog
          title={title}
          description={description}
          onClose={toggleDialog}
        />
      )}
    </div>
  );
};

export { TaskItem };
