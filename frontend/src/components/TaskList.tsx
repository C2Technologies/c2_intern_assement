import { Task } from "../types/types";
import { TaskItem } from "./TaskItem";

const TaskList = ({ tasks }: { tasks: Task[] }) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          title={task.title}
          description={task.description}
        />
      ))}
    </div>
  );
};

export { TaskList };
