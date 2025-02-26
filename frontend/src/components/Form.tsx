interface FormProps {
  title: string;
  content: string;
  handleSubmit: (event: React.FormEvent) => void;
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleContentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Form = ({
  title,
  content,
  handleSubmit,
  handleTitleChange,
  handleContentChange,
}: FormProps) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <input
            id="content"
            type="text"
            value={content}
            onChange={handleContentChange}
          />
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export { Form };
