interface TaskDetails {
  title: string;
  description: string;
  completed: boolean;
  handleStatusChange: () => void;
  handleTaskDeletion: () => void;
}

const TaskItem = ({
  title,
  description,
  completed,
  handleStatusChange,
  handleTaskDeletion,
}: TaskDetails) => {
  return (
    <div>
      <p>{title}</p>
      <p>{description}</p>
      <button onClick={handleTaskDeletion}>delete</button>
      <label>
        Mark as completed:{" "}
        <input
          type="checkbox"
          name="completionStatus"
          checked={completed}
          onChange={handleStatusChange}
        />
      </label>
    </div>
  );
};

export { TaskItem };
