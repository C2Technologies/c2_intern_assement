import { UserButton } from "@clerk/clerk-react";
import "../styles/sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>NOTIFY</h1>
        <div>
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
