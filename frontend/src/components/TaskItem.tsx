interface TaskDetails {
  title: string;
  description: string
  handleTaskDeletion: () => void
}

const TaskItem = ({ title, description, handleTaskDeletion }: TaskDetails) => {

  return (
    <div>
      <p>{title}</p>
      <p>{description}</p>
      <button onClick={handleTaskDeletion}>delete</button>
    </div>
  );
};

export { TaskItem };
