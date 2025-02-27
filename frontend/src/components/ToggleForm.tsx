import { ReactNode, useState } from "react";

interface ToggleFormProps {
  buttonLabel: string;
  children: ReactNode;
}

const ToggleForm = ({ buttonLabel, children }: ToggleFormProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  const toggleVisibility = () => {
    setVisible((prev) => !prev);
  };

  return (
    <div>
      {!visible && <button onClick={toggleVisibility}>{buttonLabel}</button>}
      {visible && (
        <div>
          {children}
          <button onClick={toggleVisibility}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export { ToggleForm };
