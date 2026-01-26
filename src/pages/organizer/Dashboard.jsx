import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios"; 
import "./dashboard.css";

function Dashboard() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/api/campaigns/dashboard")
      .then(res => setData(res.data))
      .catch(err => console.error("Dashboard error handled by interceptor"));
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
          <h2>₹{(data.totalFundsRaised || 0).toLocaleString()}</h2>
        </div>
        <div className="metric-card">
          <span className="tag">ACTIVE CAMPAIGNS</span>
          <h2>{data.activeCampaigns || 0}</h2>
        </div>
        <div className="metric-card">
          <span className="tag">SYSTEM EFFICIENCY</span>
          <h2>{data.totalCampaigns > 0 ? Math.round((data.activeCampaigns / data.totalCampaigns) * 100) : 0}%</h2>
        </div>
      </div>

      <div className="full-width-chart">
        <div className="chart-panel">
          <div className="chart-header">
            <h3>FUND COLLECTION</h3>
            <span>Live Database Sync</span>
          </div>
          <div className="bar-list">
            {hasStats ? (
              data.campaigns.map(c => {
                const ratio = c.targetAmount > 0 ? (c.collectedAmount / c.targetAmount) * 100 : 0;
                return (
                  <div key={c.campaignId} className="bar-group">
                    <div className="bar-info">
                      <span className="campaign-name">{c.title?.toUpperCase()}</span>
                      <span className="campaign-ratio">{ratio.toFixed(1)}%</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: `${Math.min(ratio, 100)}%` }}>
                        {ratio > 15 && <span className="inside-label">₹{c.collectedAmount?.toLocaleString()}</span>}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : <p className="no-data-msg">NO ACTIVE CAMPAIGNS FOUND</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;