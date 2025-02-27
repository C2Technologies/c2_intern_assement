import { useState } from "react";
import "../styles/TodoTask.css";
import { Todo } from "../../../models/Task";

type TodoTaskProps = {
  task: Todo;
};

const TodoTask: React.FC<TodoTaskProps> = ({ task }) => {
  const [completed, setCompleted] = useState(task.completed);

  const handleStatusChange = () => {
    setCompleted(!completed);
  };

  const handleDelete = () => {};

  return (
    <div className="task-item">
      <div>
        <span className="task-title">{task.title}</span>
        <p>{task.description}</p>
      </div>

      <div className="task-actions">
        <button className="status-btn" onClick={handleStatusChange}>
          {completed ? "Completed" : "Mark as Complete"}
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoTask;
