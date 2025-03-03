import { useEffect, useState } from "react";
import "../styles/ModifyTodo.css";
import { Todo } from "../../../models/Task";
import UseTasks from "../../../hooks/UseTasks";
export default function TodoModal({
  isOpen,
  onSave,
  onCancel,
  currentTodo,
}: {
  isOpen: boolean;
  onSave: (todo: Todo) => void;
  onCancel: () => void;
  currentTodo?: Todo;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const tasks = UseTasks();
  const [id, setId] = useState(tasks);

  useEffect(() => {
    if (currentTodo !== undefined) {
      setTitle(currentTodo!.title);
      setDescription(currentTodo!.description);
      setCompleted(currentTodo!.completed);
      setId(currentTodo.id);
    }
  }, []);

  const handleSave = () => {
    if (title.trim() === "" || description.trim() === "") {
      alert("Title and Description are required!");
      return;
    }

    const newTodo: Todo = {
      id,
      title,
      description,
      completed,
    };

    onSave(newTodo); // Call the provided onSave function
    setTitle("");
    setDescription("");
    setCompleted(false);
    setId(null);
  };

  if (!isOpen) return null; // Don't render modal if it's not open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Todo</h3>

        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <select
          value={completed ? "true" : "false"}
          onChange={(e) => setCompleted(e.target.value === "true")}
        >
          <option value="false">Not Completed</option>
          <option value="true">Completed</option>
        </select>

        <div>
          <button className="close-modal-btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="save-modal-btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
