import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./styles/dropdown.css";
import TodoTask from "./components/TodoTask";
import { Todo } from "../../models/Task";

const Index = () => {
  const [selectedOption, setSelectedOption] = useState(
    "Status (In progress first)"
  );

  const options = [
    "Status (In progress first)",
    "Status (Completed first)",
    "Priority (High to Low)",
    "Priority (Low to High)",
    "Date (Newest first)",
    "Date (Oldest first)",
  ];
  const todos: Todo[] = [
    {
      id: 1,
      title: "Buy groceries",
      description: "Milk, Bread, Eggs",
      completed: false,
    },
    {
      id: 2,
      title: "Finish project",
      description: "Complete the dashboard UI",
      completed: true,
    },
    {
      id: 3,
      title: "Workout",
      description: "Go for a 30-minute run",
      completed: false,
    },
    {
      id: 4,
      title: "Read a book",
      description: "Read 50 pages of 'Atomic Habits'",
      completed: true,
    },
  ];

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
        <Header />
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
          {todos.map((task) => (
            <TodoTask task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
