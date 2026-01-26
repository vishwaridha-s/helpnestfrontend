import Sidebar from "../sidebar/Sidebar";
import "./layout.css";

function AppLayout({ role, children }) {
  return (
    <div className="app-layout">
      <Sidebar role={role} />
      <main className="app-content">{children}</main>
    </div>
  );
}

export default AppLayout;
