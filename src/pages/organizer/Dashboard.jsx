import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios"; 
import "./dashboard.css";

// Vivid color palette for different bars
const VIBRANT_COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#06b6d4", "#f43f5e"];

function Dashboard() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/api/campaigns/dashboard")
      .then(res => setData(res.data))
      .catch(err => console.error("Dashboard error", err));
  }, []);

  if (!data) return <div className="loader">FETCHING SYSTEM DATA...</div>;

  const hasStats = data.campaigns && data.campaigns.length > 0;

  return (
    <div className="dash-container">
      <div className="dash-header">
        <div className="title-block">
          <h1>SYSTEM ANALYTICS</h1>
          <p>Real-time campaign performance & tracking</p>
        </div>
        <button className="btn-action" onClick={() => navigate("/organizer/start-campaign")}>
          NEW CAMPAIGN
        </button>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <span className="tag">TOTAL CAPITAL RAISED</span>
          <h2>₹{(data.totalFundsRaised || 0).toLocaleString('en-IN')}</h2>
        </div>
        <div className="metric-card">
          <span className="tag">ACTIVE PROJECTS</span>
          <h2>{data.activeCampaigns} <small style={{fontSize: '0.9rem', color: '#94a3b8'}}>/ {data.totalCampaigns}</small></h2>
        </div>
        <div className="metric-card">
          <span className="tag">INACTIVE PROJECTS</span>
          <h2>{data.inactiveCampaigns || 0}</h2>
        </div>
      </div>

      <div className="chart-panel">
        <div className="chart-header">
          <div>
            <h3>FUND COLLECTION BY CAMPAIGN</h3>
            <p className="sub-msg">Live filling bars per donation progress</p>
          </div>
          <span>REAL-TIME SYNC</span>
        </div>

        <div className="graph-container">
          {hasStats ? (
            data.campaigns.map((c, index) => {
              const percentage = c.targetAmount > 0 ? (c.collectedAmount / c.targetAmount) * 100 : 0;
              // Cycle through the color array based on the index
              const barColor = VIBRANT_COLORS[index % VIBRANT_COLORS.length];
              
              return (
                <div key={c.campaignId} className="v-bar-group">
                  <div className="v-bar-track">
                    <div 
                      className="v-bar-fill" 
                      style={{ 
                        height: `${Math.min(percentage, 100)}%`,
                        backgroundColor: barColor,
                        boxShadow: `0 -4px 15px ${barColor}66` // Glow effect
                      }}
                    >
                      {percentage > 12 && (
                        <span className="v-percent-tag">{Math.round(percentage)}%</span>
                      )}
                    </div>
                  </div>
                  <div className="v-bar-info">
                    <span className="v-name">{c.title}</span>
                    <span className="v-amount">₹{c.collectedAmount.toLocaleString('en-IN')}</span>
                    <span className="v-donors">{c.donorCount} Donors</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-data-msg">
               <p>NO ACTIVE CAMPAIGNS FOUND</p>
               <span className="sub-msg">Start a campaign to see it fill!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;