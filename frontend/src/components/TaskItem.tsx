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
        <button onClick={handleTaskDeletion}>Delete</button>
        <button onClick={handleTaskEdit}>Edit</button>
      </div>
      {/* <p>{description}</p> */}
    </div>
  );
};

export { TaskItem };
