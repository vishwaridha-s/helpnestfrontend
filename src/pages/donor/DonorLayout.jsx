import { NavLink, Outlet, Navigate, useLocation } from "react-router-dom";
import "./donorLayout.css";

function DonorLayout() {
  const location = useLocation();
  if (location.pathname === "/donor") return <Navigate to="/donor/explore" replace />;

  return (
    <div className="donor-shell">
      <aside className="donor-sidebar">
        <div className="donor-brand">HELPNEST <span>DONOR</span></div>
        <nav className="donor-nav">
          <NavLink to="/donor/explore" className={({isActive}) => isActive ? "active" : ""}>EXPLORE CAUSES</NavLink>
          <NavLink to="/donor/my-donations" className={({isActive}) => isActive ? "active" : ""}>MY DONATIONS</NavLink>
          <NavLink to="/donor/my-pools" className={({isActive}) => isActive ? "active" : ""}>MY POOLS</NavLink>
          <NavLink to="/donor/profile" className={({isActive}) => isActive ? "active" : ""}>PROFILE</NavLink>
        </nav>
      </aside>
      <main className="donor-viewport">
        <Outlet />
      </main>
    </div>
  );
}
export default DonorLayout;