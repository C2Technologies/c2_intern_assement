import { useState } from "react";
import "../styles/TodoTask.css";
import { Todo } from "../../../models/Task";
import ModifyTodo from "./ModifyTodo";

type TodoTaskProps = {
  task: Todo;
  onSave: (updatedTodo: Todo) => void;
  onCancel: () => void;
};

const TodoTask: React.FC<TodoTaskProps> = ({ task, onSave, onCancel }) => {
  const [completed, setCompleted] = useState(task.completed);
  const [edit, setEdit] = useState(false);

  const handleStatusChange = () => {
    setCompleted(!completed);
  };

  const handleSave = (updatedTodo: Todo) => {
    onSave(updatedTodo);
    setEdit(false);
  };

  // Cancel edit mode
  const handleCancel = () => {
    setEdit(false);
    onCancel();
  };

  // Handle delete (implement later)
  const handleDelete = async () => {
    console.log(`Deleting task: ${task.id}`);
  };

  return (
    <>
      {edit && (
        <ModifyTodo
          isOpen={edit}
          currentTodo={task}
          onCancel={() => {
            setEdit(false);
          }}
          onSave={() => {}}
        />
      )}

      <div className="task-item">
        <div>
          <h1 className="task-title">{task.title}</h1>
          <span>{task.description}</span>
        </div>

        <div className="task-actions">
          <button className="status-btn" onClick={handleStatusChange}>
            {completed ? "Completed" : "Mark as Complete"}
          </button>
          <button className="edit-btn" onClick={() => setEdit(true)}>
            Edit
          </button>
          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoTask;
