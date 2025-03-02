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
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="task-container">
      <div className="task-content">
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
          {description && (
            <button onClick={toggleExpanded} className="expand-btn">
              <img
                src={`public/images/${
                  expanded ? "chevron-up" : "chevron-down"
                }.svg`}
                alt={expanded ? "collapse" : "expand"}
              />
            </button>
          )}
          <button onClick={handleTaskEdit} className="edit-btn">
            <img src="public/images/pen.svg" alt="edit icon" />
          </button>
          <button onClick={handleTaskDeletion} className="delete-btn">
            <img
              src="public/images/icons8-trash-1-dark.svg"
              alt="delete icon"
            />
          </button>
        </div>
      </div>
      {expanded && description && (
        <div className="task-description">
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

export { TaskItem };
