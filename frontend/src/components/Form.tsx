interface FormProps {
  title: string;
  description: string;
  handleSubmit: (event: React.FormEvent) => void;
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Form = ({
  title,
  description,
  handleSubmit,
  handleTitleChange,
  handleDescriptionChange,
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
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export { Form };
