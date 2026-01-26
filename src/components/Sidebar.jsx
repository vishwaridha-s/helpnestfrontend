import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./sidebar.css";

function Sidebar({ role }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const organizerMenu = [
    { label: "Dashboard", path: "/organizer/dashboard"},
    { label: "Start Campaign", path: "/organizer/start"},
    { label: "My Campaigns", path: "/organizer/campaigns"},
    { label: "Campaign History", path: "/organizer/history"},
    { label: "Profile", path: "/profile"},
  ];

  const menu = role === "ORGANIZER" ? organizerMenu : [];

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-top">
        <span className="logo">◎</span>
        {!collapsed && <span className="brand">HelpNest</span>}
      </div>

      <nav className="sidebar-menu">
        {menu.map((item) => (
          <div
            key={item.path}
            className={`menu-item ${
              location.pathname === item.path ? "active" : ""
            }`}
            onClick={() => navigate(item.path)}
          >
            <span className="icon">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </div>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? "➡️" : "⬅️"}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
