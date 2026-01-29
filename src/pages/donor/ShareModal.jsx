import React from "react";
import "./shareModal.css";

const SERVER_URL = import.meta.env.VITE_API_BASE_URL;

function ShareModal({ campaign, onClose }) {
  const shareUrl = `${window.location.origin}/donor/donate/${campaign.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="share-overlay" onClick={onClose}>
      <div className="share-card" onClick={(e) => e.stopPropagation()}>
        <div className="share-header">
          <h3>Spread the Word</h3>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="share-preview">
          <img
            src={`${SERVER_URL}/${campaign.imageUrl}`}
            alt=""
            crossOrigin="anonymous"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/400x250?text=No+Image";
            }}
          />
          <div className="preview-text">
            <strong>{campaign.title}</strong>
            <p>
              Help us reach ₹
              {campaign.targetAmount.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        <div className="share-actions">
          <button
            className="social-btn wa"
            onClick={() =>
              window.open(
                `https://wa.me/?text=Check this out: ${shareUrl}`
              )
            }
          >
            WhatsApp
          </button>

          <div className="link-copy-area">
            <input type="text" readOnly value={shareUrl} />
            <button onClick={handleCopy}>COPY</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;
