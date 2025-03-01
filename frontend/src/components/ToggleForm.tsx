import { ReactNode, useState } from "react";

interface ToggleFormProps {
  buttonLabel: string;
  children: ReactNode;
  onCancel?: () => void;
  isVisible?: boolean;
  setIsVisible?: (visible: boolean) => void;
}

const ToggleForm = ({
  buttonLabel,
  children,
  onCancel,
  isVisible: externalVisible,
  setIsVisible: setExternalVisible,
}: ToggleFormProps) => {
  const [internalVisible, setInternalVisible] = useState<boolean>(false);
  const isControlled =
    externalVisible !== undefined && setExternalVisible !== undefined;
  const visible = isControlled ? externalVisible : internalVisible;
  const setVisible = isControlled ? setExternalVisible : setInternalVisible;

  const toggleVisibility = () => {
    setVisible(!visible);

    if (visible && onCancel) {
      onCancel();
    }
  };

  return (
    <div>
      {!visible && (
        <button onClick={toggleVisibility} className="submit-btn">
          {buttonLabel}
        </button>
      )}
      {visible && (
        <div className="task-edit-container">
          <div className="task-header">
            <span className="edit-task-title">Default Task</span>
            <span className="edit-task-date">31/12/2020</span>
          </div>
          <div className="task-form-edit">{children}</div>
          <div className="task-footer">
            <button onClick={toggleVisibility} className="close-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export { ToggleForm };
