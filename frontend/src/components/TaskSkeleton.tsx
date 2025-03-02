interface TaskSkeletonProps {
  count?: number;
}

const TaskSkeleton: React.FC<TaskSkeletonProps> = ({ count = 3 }) => {
  return (
    <div className="task-skeleton">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="task-container skeleton-item">
            <div className="task-left">
              <div className="skeleton-circle"></div>
              <div className="skeleton-text"></div>
            </div>
            <div className="task-right">
              <div className="skeleton-button"></div>
              <div className="skeleton-button"></div>
              <div className="skeleton-button"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export { TaskSkeleton };
