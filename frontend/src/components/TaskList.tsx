import { Task } from "../types/types";
import { TaskItem } from "./TaskItem";

const TaskList = ({
  tasks,
  handleTaskDeletion,
}: {
  tasks: Task[];
  handleTaskDeletion: (taskId: number, taskTitle: string) => void;
}) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          title={task.title}
          description={task.description}
          handleTaskDeletion={() => handleTaskDeletion(task.id, task.title)}
        />
      ))}
    </div>
  );
};

export { TaskList };
