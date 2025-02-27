import "../styles/header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-left">
        <h2>
          Tasks <span className="badge">12</span>
        </h2>
      </div>

      <div className="header-controls">
        <button className="new-btn">+ New</button>
      </div>
    </div>
  );
};

export default Header;
