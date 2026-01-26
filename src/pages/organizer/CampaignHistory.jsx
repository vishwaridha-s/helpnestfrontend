import { useEffect, useState } from "react";
import "./campaignHistory.css";

function CampaignHistory() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
  API.get("/api/campaigns/history")
    .then(res => setList(res.data))
    .finally(() => setLoading(false));
  }, []);



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
          {list.map(c => (
            <div key={c.id} className="history-card">
               <div className="history-meta">
                  <span className="date">{new Date(c.createdAt).toLocaleDateString()}</span>
                  <span className="status-tag">{c.status}</span>
               </div>
               {/* Added ?. to handle possible nulls */}
               <h3>{c.title?.toUpperCase() || "UNTITLED"}</h3>
               <div className="history-stats">
                  <span>FINAL RAISED: ₹{c.collectedAmount?.toLocaleString()}</span>
                  <span>TARGET: ₹{c.targetAmount?.toLocaleString()}</span>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CampaignHistory;