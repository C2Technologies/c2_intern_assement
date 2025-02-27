import { Task } from "../types/types";
import { TaskItem } from "./TaskItem";

const TaskList = ({
  tasks,
  handleStatusChange,
  handleTaskDeletion,
}: {
  tasks: Task[];
  handleStatusChange: (taskIdL: number, completed: boolean) => void;
  handleTaskDeletion: (taskId: number, taskTitle: string) => void;
}) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          title={task.title}
          completed={task.completed}
          description={task.description}
          handleStatusChange={() => handleStatusChange(task.id, task.completed)}
          handleTaskDeletion={() => handleTaskDeletion(task.id, task.title)}
        />
      ))}
    </div>
  );
};

export { TaskList };
