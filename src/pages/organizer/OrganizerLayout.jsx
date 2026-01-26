import { NavLink, Outlet } from "react-router-dom";
import "./organizerLayout.css";

function OrganizerLayout() {
  return (
    <div className="org-shell">
      <aside className="org-sidebar">
        <div className="sidebar-brand">HELPNEST <span>ADMIN</span></div>
        <nav className="sidebar-nav">
          <NavLink to="/organizer/dashboard" className={({isActive}) => isActive ? "active" : ""}>
            DASHBOARD
          </NavLink>
          <NavLink to="/organizer/my-campaigns" className={({isActive}) => isActive ? "active" : ""}>
            MY CAMPAIGNS
          </NavLink>
          <NavLink to="/organizer/history" className={({isActive}) => isActive ? "active" : ""}>
            HISTORY
          </NavLink>
          <NavLink to="/organizer/profile" className={({isActive}) => isActive ? "active" : ""}>
            PROFILE
          </NavLink>
        </nav>
      </aside>
      <main className="org-viewport">
        <Outlet />
      </main>
    </div>
  );
}

export default OrganizerLayout;