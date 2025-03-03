import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./styles/dropdown.css";
import TodoTask from "./components/TodoTask";
import { Todo } from "../../models/Task";
import UseTasks from "../../hooks/UseTasks";
const Index = () => {
  const [selectedOption, setSelectedOption] = useState(
    "Status (In progress first)"
  );

  const options = ["All", "Status (In progress)", "Status (Completed)"];
  const tasks = UseTasks();

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
        <Header taskCount={tasks !== undefined ? tasks.length : 0} />
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
            tasks
              .filter((task: Todo) => {
                if (selectedOption === options[2]) {
                  return task.completed === true;
                } else if (selectedOption === options[1]) {
                  return task.completed === false;
                } else {
                  return task.completed !== null;
                }
              })
              .map((task: Todo) => <TodoTask key={task.id} task={task} />)}
        </div>
      </div>
    </div>
  );
};

export default Index;
