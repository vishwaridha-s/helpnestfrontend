import { useEffect, useState } from "react";
import API from "../../api/axios";
import "./myCampaigns.css";

function MyCampaigns() {
  const [list, setList] = useState([]);

  const fetchCampaigns = () => {
    API.get("/api/campaigns/my")
      .then(res => {
        // Filter only active ones for this view
        setList(res.data.filter(c => c.status === "ACTIVE"));
      })
      .catch(err => console.error("Fetch Error"));
  };

  useEffect(() => { fetchCampaigns(); }, []);

  const handleDelete = (id) => {
    if(window.confirm("Archive this campaign?")) {
      API.delete(`/api/campaigns/${id}`).then(fetchCampaigns);
    }
  };

  return (
    <div className="campaign-manager">
      <h1>YOUR ACTIVE PROJECTS</h1>
      <div className="campaign-list">
        {list.map(c => (
          <div key={c.id} className="c-card">
            <h3>{c.title}</h3>
            <button onClick={() => handleDelete(c.id)}>DELETE</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyCampaigns;