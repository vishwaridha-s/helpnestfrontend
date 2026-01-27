import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import "./startPool.css";

function StartPool() {
  const [form, setForm] = useState({ title: "", targetAmount: "", description: "" });
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData();
    const poolData = { ...form, campaignType: "POOL" };
    
    formData.append("campaign", new Blob([JSON.stringify(poolData)], { type: "application/json" }));
    if (image) formData.append("image", image);

    try {
      await API.post("/api/campaigns/pools", formData);
      navigate("/donor/my-pools");
    } catch (err) { 
      alert("Error launching pool"); 
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pool-form-shell">
      <div className="pool-form-card">
        <header className="form-header">
          <h1>LAUNCH NEW POOL</h1>
          <p>Set a goal and invite others to contribute to your cause.</p>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label>POOL TITLE</label>
            <input 
              type="text" 
              placeholder="e.g. Help my neighbor's surgery"
              onChange={e => setForm({...form, title: e.target.value})} 
              required 
            />
          </div>

          <div className="input-field">
            <label>TARGET AMOUNT (₹)</label>
            <input 
              type="number" 
              placeholder="50000"
              onChange={e => setForm({...form, targetAmount: e.target.value})} 
              required 
            />
          </div>

          <div className="input-field">
            <label>DESCRIPTION</label>
            <textarea 
              rows="4" 
              placeholder="Tell your story..."
              onChange={e => setForm({...form, description: e.target.value})} 
              required
            ></textarea>
          </div>

          <div className="input-field">
            <label>POOL IMAGE</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={e => setImage(e.target.files[0])} 
            />
          </div>

          <div className="form-actions">
            {/* CANCEL BUTTON */}
            <button 
              type="button" 
              className="btn-cancel" 
              onClick={() => navigate("/donor/my-pools")}
              disabled={isSubmitting}
            >
              CANCEL
            </button>

            {/* SUBMIT BUTTON */}
            <button 
              type="submit" 
              className="btn-launch"
              disabled={isSubmitting}
            >
              {isSubmitting ? "LAUNCHING..." : "CREATE POOL"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StartPool;