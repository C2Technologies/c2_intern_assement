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
  return (
    <div className="task-container">
      <div className="task-left">
        <label>
          <input
            type="checkbox"
            name="completionStatus"
            checked={completed}
            onChange={handleStatusChange}
          />
          {/* Mark as completed:{" "} */}
        </label>
        <p>{title}</p>
      </div>
      <div className="task-right">
        <button onClick={handleTaskEdit} className="edit-btn">
          <img src="public/images/pen.svg" alt="edit icon" />
        </button>
        <button onClick={handleTaskDeletion} className="delete-btn">
          <img src="public/images/icons8-trash-1-dark.svg" alt="delete icon" />
        </button>
      </div>
      {/* <p>{description}</p> */}
    </div>
  );
};

export { TaskItem };
