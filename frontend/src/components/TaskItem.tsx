import { useState } from "react";

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
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
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
        <button onClick={toggleDescription} className="expand-btn">
          <img
            src={`public/images/${
              isExpanded ? "chevron-up" : "chevron-down"
            }.svg`}
            alt={isExpanded ? "collapse" : "expand"}
          />
        </button>
        <button onClick={handleTaskEdit} className="edit-btn">
          <img src="public/images/pen.svg" alt="edit icon" />
        </button>
        <button onClick={handleTaskDeletion} className="delete-btn">
          <img src="public/images/icons8-trash-1-dark.svg" alt="delete icon" />
        </button>
      </div>
      {/* {isExpanded && description && (
        <div className="task-description">
          <p>{description}</p>
        </div>
      )} */}
    </div>
  );
};

export { TaskItem };
