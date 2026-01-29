import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import "./StartCampaign.css";

function StartCampaign() {
  const [formData, setFormData] = useState({ title: "", targetAmount: "", description: "" });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("campaign", JSON.stringify({
      title: formData.title,
      description: formData.description,
      targetAmount: parseFloat(formData.targetAmount)
    }));
    data.append("image", image);

    try {
      await API.post("/api/campaigns", data);
      navigate("/organizer/my-campaigns");
    } catch (err) {
      console.error(err);
      alert("DEPLOYMENT FAILED: Check console for mapping errors.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-shell">
      <div className="form-container">
        <div className="form-context-panel">
          <h2>NEW CAMPAIGN</h2>
          <p>Initialize a new funding campaign.</p>
        </div>

        <form onSubmit={handleSubmit} className="pro-input-area">
          <div className="input-row">
            <label>CAMPAIGN TITLE</label>
            <input type="text" required onChange={e => setFormData({...formData, title: e.target.value})} />
          </div>

          <div className="input-grid">
            <div className="input-row">
              <label>TARGET AMOUNT (₹)</label>
              <input type="number" required onChange={e => setFormData({...formData, targetAmount: e.target.value})} />
            </div>
            <div className="input-row">
              <label>CAMPAIGN IMAGE</label>
              <input type="file" required onChange={e => setImage(e.target.files[0])} />
            </div>
          </div>

          <div className="input-row">
            <label>DESCRIPTION</label>
            <textarea rows="6" required onChange={e => setFormData({...formData, description: e.target.value})} />
          </div>

          <div className="form-footer">
            <button type="button" className="btn-ghost" onClick={() => navigate(-1)}>CANCEL</button>
            <button type="submit" className="btn-solid" disabled={loading}>
              {loading ? "INITIALIZING..." : "ACTIVATE CAMPAIGN"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StartCampaign;