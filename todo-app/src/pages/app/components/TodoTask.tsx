import { useState } from "react";
import "../styles/TodoTask.css";
import { Todo } from "../../../models/Task";
import ModifyTodo from "./ModifyTodo";
import { deleteTodo, updateTodo } from "../../../utils/requests";

type TodoTaskProps = {
  task: Todo;
};

const TodoTask: React.FC<TodoTaskProps> = ({ task }) => {
  const [edit, setEdit] = useState(false);

  const handleStatusChange = async () => {
    let todo = task;
    todo.completed = !task.completed;
    await handleEdit(todo);
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(task.id);
    } catch (error) {
      alert(error);
    } finally {
      setEdit(false);
    }
  };

  const handleEdit = async (todo: Todo) => {
    try {
      await updateTodo(todo);
    } catch (error) {
      alert(error);
    } finally {
      setEdit(false);
    }
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
          onSave={async (todo) => {
            await handleEdit(todo);
          }}
        />
      )}

      <div className="task-item">
        <div>
          <h1 className="task-title">{task.title}</h1>
          <span>{task.description}</span>
        </div>

        <div className="task-actions">
          <button className="status-btn" onClick={handleStatusChange}>
            {task.completed ? "Completed" : "Mark as Complete"}
          </button>
          <button
            className="edit-btn"
            onClick={() => {
              setEdit(true);
            }}
          >
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
