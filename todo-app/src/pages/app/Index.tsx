import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./styles/dropdown.css";
import TodoTask from "./components/TodoTask";
import { Todo } from "../../models/Task";
import ModifyTodo from "./components/ModifyTodo";
import UseTasks from "../../hooks/UseTasks";

const Index = () => {
  const [selectedOption, setSelectedOption] = useState(
    "Status (In progress first)"
  );
  const tasks = UseTasks();

  const options = ["All", "Status (In progress)", "Status (Completed)"];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flex: 1,
      }}
    >
      <Sidebar />
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          backgroundColor: "#1a1a1a",
          paddingLeft: 40,
          paddingRight: 40,
        }}
      >
        <Header taskCount={tasks !== undefined ? tasks.data.length : 0} />
        <div className="sort-by-dropdown">
          <span className="label">Sort by</span>
          <select
            className="dropdown"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          {tasks !== undefined &&
            tasks.data.map((task: Todo) => <TodoTask task={task} />)}
        </div>
      </div>
    </div>
  );
};

export default Index;
