import { useNavigate } from "react-router-dom";
import "../../styles/donation.css";

function DonationSuccess() {
  const navigate = useNavigate();

  return (
    <div className="donation-container">
      <div className="donation-stepper-card success-card">
        <div className="success-icon">✓</div>
        <h2>CONTRIBUTION SUCCESSFUL</h2>
        <p>Your donation has been verified and processed securely.</p>
        <div className="receipt-box">
            <span>Transaction: SECURE_STRIPE_INTENT</span>
            <span>Status: COMPLETED</span>
        </div>
        <button className="btn-action" onClick={() => navigate("/donor/explore")}>
          BACK TO EXPLORE
        </button>
      </div>
    </div>
  );
}
export default DonationSuccess;