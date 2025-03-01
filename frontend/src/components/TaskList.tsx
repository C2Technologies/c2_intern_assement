import { Task } from "../types/types";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  handleStatusChange: (taskIdL: number, completed: boolean) => void;
  handleTaskDeletion: (taskId: number, taskTitle: string) => void;
  handleTaskEdit: (task: Task) => void;
}

const TaskList = ({
  tasks,
  handleStatusChange,
  handleTaskDeletion,
  handleTaskEdit,
}: TaskListProps) => {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p className="no-tasks">No tasks</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            title={task.title}
            completed={task.completed}
            description={task.description}
            handleStatusChange={() =>
              handleStatusChange(task.id, task.completed)
            }
            handleTaskDeletion={() => handleTaskDeletion(task.id, task.title)}
            handleTaskEdit={() => handleTaskEdit(task)}
          />
        ))
      )}
    </div>
  );
};

export { TaskList };
