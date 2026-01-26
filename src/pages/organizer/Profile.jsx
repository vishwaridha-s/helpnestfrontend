import { useEffect, useState } from "react";
import API from "../../api/axios";
import "./profile.css";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get("/api/profile")
      .then(res => setUser(res.data))
      .catch(()=>{});
  }, []);

  if (!user) return <div className="loader">LOADING PROFILE...</div>;

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="Avatar" width="100"/>
          <h2>{user.name?.toUpperCase()}</h2>
          <p>{user.email}</p>
          <button className="logout-btn" onClick={() => { localStorage.clear(); window.location.href="/"; }}>
             LOGOUT
          </button>
      </div>
    </div>
  );
}

export default Profile;