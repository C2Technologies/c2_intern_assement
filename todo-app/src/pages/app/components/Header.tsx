import { useState } from "react";
import "../styles/header.css";
import TodoModal from "./ModifyTodo";
import { createTodo } from "../../../utils/requests";
type props = {
  taskCount: number;
};
const Header = ({ taskCount }: props) => {
  const [edit, setEdit] = useState(false);
  return (
    <>
      {edit && (
        <TodoModal
          isOpen={edit}
          onCancel={() => {
            setEdit(false);
          }}
          onSave={async (todo) => {
            try {
              await createTodo(todo);
            } catch (error) {
              alert(error);
            } finally {
              setEdit(false);
              window.location.reload();
            }
          }}
        />
      )}
      <div className="header">
        <div className="header-left">
          <h2>
            Tasks <span className="badge">{taskCount}</span>
          </h2>
        </div>
        <div className="header-controls">
          <button
            onClick={() => {
              setEdit(true);
            }}
            className="new-btn"
          >
            + New
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
