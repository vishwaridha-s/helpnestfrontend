import { useEffect, useState } from "react";
import API from "../../api/axios";
import "./profile.css";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get("/api/auth/profile")
      .then(res => setUser(res.data))
      .catch(err => console.error("Profile fetch failed", err));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  if (!user) return <div className="loader">LOADING PROFILE...</div>;

  return (
    <div className="profile-wrapper">
      <div className="profile-card">

        <div className="profile-sidebar">
          <div className="avatar-circle">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
              alt="Avatar"
            />
          </div>

          <h2>{user.name?.toUpperCase()}</h2>
          <p>{user.email}</p>
          <div className="role-tag">{user.role}</div>
        </div>

        <div className="profile-main">
          <div className="detail-section">
            <h3>ACCOUNT DETAILS</h3>

            <div className="detail-row">
              <label>NAME</label>
              <p>{user.name}</p>
            </div>

            <div className="detail-row">
              <label>EMAIL</label>
              <p>{user.email}</p>
            </div>

            <div className="detail-row">
              <label>ROLE</label>
              <p className="status-verified">{user.role}</p>
            </div>
          </div>

          <button className="logout-btn" onClick={logout}>
            LOGOUT
          </button>
        </div>

      </div>
    </div>
  );
}

export default Profile;
