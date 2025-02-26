interface TaskDetails {
  title: string;
  description: string
}

const TaskItem = ({ title, description }: TaskDetails) => {

  return (
    <div>
      <p>{title}</p>
      <p>{description}</p>
    </div>
  );
};

export { TaskItem };
