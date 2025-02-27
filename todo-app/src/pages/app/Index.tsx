import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

const Index = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flex: 1,
      }}
    >
      <Sidebar />
      <div style={{ display: "flex", flex: 1 }}>
        <Header />
      </div>
    </div>
  );
};

export default Index;
