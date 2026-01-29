import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import ShareModal from "./ShareModal";
import "./donorExplore.css";

const SERVER_URL = import.meta.env.VITE_API_BASE_URL;

function DonorExplore() {
  const [campaigns, setCampaigns] = useState([]);
  const [activeShare, setActiveShare] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/api/campaigns/public")
      .then((res) => setCampaigns(res.data))
      .catch((err) => console.error("Error fetching campaigns:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loader">LOADING EXPLORE...</div>;

  return (
    <div className="explore-container">
      <header className="explore-header">
        <div className="header-text">
          <h1>EXPLORE CAUSES</h1>
          <p>Discover active campaigns and funding pools ready for your support.</p>
        </div>
        <button className="btn-create-pool" onClick={() => navigate("/donor/create-pool")}>
          + START A POOL
        </button>
      </header>

      <div className="explore-grid">
        {campaigns.map((c) => {
          const imagePath = c.imageUrl ? c.imageUrl.replace(/^\//, '') : '';
          const fullImageUrl = `${SERVER_URL}/${imagePath}`;
          const progress = (c.collectedAmount / c.targetAmount) * 100;

          return (
            <div key={c.id} className="explore-card">
              <div className="card-image">
                <img 
                  src={fullImageUrl} 
                  alt={c.title} 
                  crossOrigin="anonymous" 
                  onError={(e) => { 
                    e.target.onerror = null; 
                    e.target.src = "https://via.placeholder.com/400x250?text=No+Image+Available"; 
                  }}
                />
                <span className="type-badge">{c.campaignType}</span>
                
                <button className="btn-share-overlay" onClick={() => setActiveShare(c)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"/>
                  </svg>
                </button>
              </div>

              <div className="card-details">
                <h3>{c.title?.toUpperCase()}</h3>
                <p>{c.description?.substring(0, 90)}...</p>
                
                <div className="card-progress">
                  <div className="progress-bar">
                    <div className="progress-inner" style={{ width: `${Math.min(progress, 100)}%` }}></div>
                  </div>
                  <div className="progress-data">
                    <span>₹{c.collectedAmount?.toLocaleString('en-IN')} raised</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                </div>

                <button className="btn-contribute" onClick={() => navigate(`/donor/donate/${c.id}`)}>
                  CONTRIBUTE NOW
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {activeShare && (
        <ShareModal 
          campaign={activeShare} 
          onClose={() => setActiveShare(null)} 
        />
      )}
    </div>
  );
}

export default DonorExplore;