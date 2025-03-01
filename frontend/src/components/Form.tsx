interface FormProps {
  title: string;
  description: string;
  handleSubmit: (event: React.FormEvent) => void;
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  submitButtonText?: string
}

const Form = ({
  title,
  description,
  handleSubmit,
  handleTitleChange,
  handleDescriptionChange,
  submitButtonText = "Add"
}: FormProps) => {
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="form-input"
            placeholder="Enter task title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">Description</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={handleDescriptionChange}
            className="form-input"
            placeholder="Enter your task description"
          />
        </div>
        <button type="submit" className="submit-btn">{submitButtonText}</button>
      </form>
    </div>
  );
};

export { Form };
