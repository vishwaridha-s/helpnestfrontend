import { useEffect, useState } from "react";
import "./campaignHistory.css";
import API from "../../api/axios";

const SERVER_URL = import.meta.env.VITE_API_BASE_URL;

function CampaignHistory() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/api/campaigns/history")
      .then(res => setList(res.data))
      .catch(err => console.error("History fetch error", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loader">LOADING HISTORY...</div>;

  return (
    <div className="history-shell">
      <div className="history-header">
        <h1>CAMPAIGN HISTORY</h1>
        <p>Log of all completed or inactive projects</p>
      </div>
      
      {!list.length ? (
        <div className="no-data-msg">
           <p>HISTORY IS EMPTY</p>
           <span>Only campaigns with status 'INACTIVE' or 'COMPLETED' will appear here.</span>
        </div>
      ) : (
        <div className="history-grid">
          {list.map(c => {
            const imagePath = c.imageUrl ? c.imageUrl.replace(/^\//, '') : '';
            const fullImageUrl = `${SERVER_URL}/${imagePath}`;

            return (
              <div key={c.id} className="history-card">
                <div className="history-image-container">
                  <img 
                    src={fullImageUrl} 
                    alt={c.title} 
                    className="history-img"
                    crossOrigin="anonymous"
                    onError={(e) => { 
                      e.target.onerror = null; 
                      e.target.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8Xw8AAisBSe8B06MAAAAASUVORK5CYII="; 
                      e.target.style.backgroundColor = "#cbd5e1"; 
                    }}
                  />
                  <span className={`status-badge ${c.status?.toLowerCase()}`}>
                    {c.status}
                  </span>
                </div>

                <div className="history-content">
                  <div className="history-meta">
                    <span className="date">{new Date(c.createdAt).toLocaleDateString('en-IN')}</span>
                    <span className="donor-tag">{c.donorCount || 0} Donors</span>
                  </div>
                  <h3>{c.title?.toUpperCase() || "UNTITLED"}</h3>
                  
                  <div className="history-stats">
                    <div className="stat-row">
                      <label>FINAL RAISED</label>
                      <span className="raised-amt">₹{c.collectedAmount?.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="stat-row">
                      <label>GOAL</label>
                      <span>₹{c.targetAmount?.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CampaignHistory;