import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import "./donorPools.css";

function DonorPools() {
  const [pools, setPools] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    // FIX: Targeting the correct @GetMapping("/pools/my") which returns List<Campaign>
    API.get("/api/campaigns/pools/my")
      .then((res) => {
        // Since the backend returns List<Campaign>, res.data IS the array.
        // We ensure it's an array before setting state.
        const data = Array.isArray(res.data) ? res.data : [];
        setPools(data);
      })
      .catch((err) => {
        console.error("Error fetching pools:", err);
        if (err.response?.status === 403) {
          console.error("Access Denied: Your JWT does not have ROLE_DONOR");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loader">LOADING YOUR POOLS...</div>;

  return (
    <div className="pools-dashboard">
      <header className="pools-header">
        <div className="header-info">
          <h1>MY ACTIVE POOLS</h1>
          <p>Track the progress of your personal fundraising initiatives.</p>
        </div>
        <button 
          className="btn-new-pool" 
          onClick={() => navigate("/donor/create-pool")}
        >
          + CREATE NEW POOL
        </button>
      </header>

      {pools.length === 0 ? (
        <div className="empty-pools-container">
          <div className="empty-icon">📂</div>
          <h2>No Active Pools</h2>
          <p>You haven't started any fundraising pools yet. Start one to support a cause today!</p>
          <button 
            className="btn-create-first" 
            onClick={() => navigate("/donor/create-pool")}
          >
            START YOUR FIRST POOL
          </button>
        </div>
      ) : (
        <div className="pools-grid">
          {pools.map((p) => (
            <div key={p.id} className="pool-mini-card">
              <div className="pool-card-header">
                <h3>{p.title?.toUpperCase() || "UNTITLED POOL"}</h3>
                <span className="pool-status-tag">ACTIVE</span>
              </div>
              
              <div className="pool-mini-stats">
                <div className="stat">
                  <span>COLLECTED</span>
                  {/* Matching entity field name 'collectedAmount' */}
                  <strong>₹{p.collectedAmount?.toLocaleString('en-IN') || 0}</strong>
                </div>
                <div className="stat">
                  <span>TARGET</span>
                  {/* Matching entity field name 'targetAmount' */}
                  <strong>₹{p.targetAmount?.toLocaleString('en-IN') || 0}</strong>
                </div>
              </div>

              <div className="pool-mini-progress">
                <div 
                  className="inner" 
                  style={{ 
                    width: `${Math.min(((p.collectedAmount || 0) / (p.targetAmount || 1)) * 100, 100)}%` 
                  }}
                ></div>
              </div>
              
              <div className="pool-card-footer">
                <span>
                  {p.targetAmount > 0 
                    ? Math.round(((p.collectedAmount || 0) / p.targetAmount) * 100) 
                    : 0}% Funded
                </span>
                <button 
                  className="btn-view-details" 
                  onClick={() => navigate(`/donor/pool-stats/${p.id}`)}
                >
                  DETAILS
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DonorPools;