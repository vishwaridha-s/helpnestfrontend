import { useEffect, useState } from "react";
import API from "../../api/axios";
import "./myCampaigns.css";

const SERVER_URL = "http://localhost:8080";

function MyCampaigns() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);
  const [newImage, setNewImage] = useState(null);

  const fetchCampaigns = () => {
    setLoading(true);
    API.get("/api/campaigns/my")
      .then(res => {
        // Filtering for ACTIVE status as per your requirement
        setList(res.data.filter(c => c.status === "ACTIVE"));
      })
      .catch(err => console.error("Fetch Error", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    const campaignJson = JSON.stringify({
      title: editData.title,
      description: editData.description,
      deadline: editData.deadline,
      targetAmount: editData.targetAmount,
      status: "ACTIVE" 
    });
    
    formData.append("campaign", new Blob([campaignJson], { type: "application/json" }));
    if (newImage) formData.append("image", newImage);

    try {
      await API.put(`/api/campaigns/${editData.id}`, formData);
      setIsEditing(false);
      fetchCampaigns();
    } catch (err) {
      alert("Failed to update.");
    }
  };

  if (loading) return <div className="loader">LOADING...</div>;

  return (
    <div className="campaign-manager">
      <div className="manager-header">
        <h1>YOUR ACTIVE PROJECTS</h1>
      </div>

      <div className="table-wrapper">
        <table className="pro-table">
          <thead>
            <tr>
              <th>PREVIEW</th>
              <th>CAMPAIGN DETAILS</th>
              <th>FINANCIALS (₹)</th>
              <th>PROGRESS</th>
              <th style={{ textAlign: "right" }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {list.map((c) => {
              const progress = c.targetAmount > 0 
                ? Math.min((c.collectedAmount / c.targetAmount) * 100, 100) 
                : 0;
              
              const imagePath = c.imageUrl ? c.imageUrl.replace(/^\//, '') : '';
              const fullImageUrl = `${SERVER_URL}/${imagePath}`;

              return (
                <tr key={c.id}>
                  <td>
                    <div style={{ width: '60px', height: '40px', backgroundColor: '#eee', borderRadius: '4px', overflow: 'hidden' }}>
                      <img 
                        src={fullImageUrl} 
                        alt="Campaign" 
                        className="table-img" 
                        crossOrigin="anonymous"
                        onError={(e) => { 
                          e.target.onerror = null; 
                          e.target.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8Xw8AAisBSe8B06MAAAAASUVORK5CYII="; 
                          e.target.style.backgroundColor = "#cbd5e1"; 
                        }}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="bold">{c.title}</div>
                    <div className="tiny-desc">Donors: <strong>{c.donorCount || 0}</strong></div>
                  </td>
                  <td>
                    {/* Using Indian Rupee Formatting */}
                    <div className="bold">Goal: ₹{Number(c.targetAmount).toLocaleString('en-IN')}</div>
                    <div className="tiny-desc" style={{ color: '#059669', fontWeight: 'bold' }}>
                      Raised: ₹{Number(c.collectedAmount).toLocaleString('en-IN')}
                    </div>
                    <div className="tiny-desc">
                      Pending: ₹{Math.max(0, c.targetAmount - c.collectedAmount).toLocaleString('en-IN')}
                    </div>
                  </td>
                  <td>
                    <div className="table-progress-bg">
                      <div className="table-progress-fill" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="percent-label">{progress.toFixed(1)}%</div>
                  </td>
                  <td className="action-cell">
                    <button className="icon-btn share" onClick={() => handleShare(c.id)}>SHARE</button>
                    <button className="icon-btn edit" onClick={() => { setEditData(c); setIsEditing(true); }}>EDIT</button>
                    <button className="icon-btn delete" onClick={() => {
                        if(window.confirm("Archive this campaign?")) API.delete(`/api/campaigns/${c.id}`).then(()=>fetchCampaigns());
                    }}>DELETE</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {isEditing && (
        <div className="modal-overlay">
          <div className="edit-modal-pro">
            <div className="modal-head">
              <h3>Edit Campaign</h3>
            </div>
            <form onSubmit={handleUpdate}>
              <div className="mod-row">
                <label>TITLE</label>
                <input type="text" value={editData.title} onChange={e => setEditData({...editData, title: e.target.value})} />
              </div>
              <div className="mod-row">
                <label>TARGET AMOUNT (₹)</label>
                <input type="number" value={editData.targetAmount} onChange={e => setEditData({...editData, targetAmount: e.target.value})} />
              </div>
              <div className="mod-row">
                <label>DESCRIPTION</label>
                <textarea rows="3" value={editData.description} onChange={e => setEditData({...editData, description: e.target.value})} />
              </div>
              <div className="mod-row">
                <label>UPLOAD NEW IMAGE</label>
                <input type="file" onChange={e => setNewImage(e.target.files[0])} />
              </div>
              <div className="modal-foot">
                <button type="button" className="btn-cancel" onClick={() => setIsEditing(false)}>CANCEL</button>
                <button type="submit" className="btn-save">UPDATE CAMPAIGN</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyCampaigns;