import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import API from "../../api/axios";
import "./donation.css";

const stripePromise = loadStripe("pk_test_51SqIieEIOeWAcPe3sKkiAgVWoTox59X3Lj5OIcXU9znHCuP4qRGnVfOPCxzdmQADveojTFDW0FPpEOIgtWNQEnxQ00SS9pMXtk");

const StripePaymentForm = ({ campaignId, amount, donorEmail, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsProcessing(true);

    try {
      // Step 1: Create Payment Intent
      const { data: intentData } = await API.post("/api/payments/create", null, {
        params: { amount: amount }
      });

      // Step 2: Confirm Payment with Stripe
      const result = await stripe.confirmCardPayment(intentData.clientSecret, {
        payment_method: { 
          card: elements.getElement(CardElement) 
        }
      });

      if (result.error) {
        alert(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        
        // Step 3: Confirm with Backend (MATCHING YOUR ENTITY FIELDS)
        await API.post(`/api/donations/${campaignId}/confirm-stripe`, {
          amount: parseFloat(amount),           // Matches Double amount
          donorEmail: donorEmail,               // REQUIRED for OTP check in backend
          paymentIntentId: result.paymentIntent.id, // Matches String paymentIntentId
          paymentStatus: "SUCCESS",             // Matches String paymentStatus
          paymentMethod: "CARD"                 // Matches String paymentMethod
        });
        
        alert("Thank you! Donation successful.");
        onSuccess();
      }
    } catch (err) { 
      console.error(err);
      // Better error messaging
      const errorMsg = err.response?.data?.message || "Payment Confirmation Failed";
      alert(errorMsg); 
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form className="stripe-inner-form" onSubmit={handleSubmit}>
      <div className="card-input-wrapper">
        <CardElement options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#1e293b',
              '::placeholder': { color: '#94a3b8' },
            },
            invalid: { color: '#ef4444' },
          }
        }} />
      </div>
      <button className="btn-confirm-pay" disabled={isProcessing}>
        {isProcessing ? "PROCESSING SECURELY..." : `PAY ₹${amount} NOW`}
      </button>
    </form>
  );
};

function Donate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(500);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  // Get current user email from token/session for the OTP verification
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // Adjust based on where you store user data
    if (user && user.email) {
      setUserEmail(user.email);
    }
  }, []);

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      await API.post(`/api/otp/send/${id}`);
      setStep(2);
    } catch (err) { alert("Error sending OTP"); }
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const { data } = await API.post(`/api/otp/verify`, { campaignId: id, otp });
      if (data.verified) setStep(3);
    } catch (err) { alert("Invalid OTP provided"); }
    setLoading(false);
  };

  return (
    <div className="donate-viewport">
      <div className="donate-wizard-card">
        <div className="wizard-stepper">Step {step} of 3</div>
        <h2 className="wizard-title">SECURE DONATION GATEWAY</h2>
        
        {step === 1 && (
          <div className="wizard-step">
            <label>ENTER CONTRIBUTION AMOUNT (INR)</label>
            <input type="number" className="wizard-input" value={amount} onChange={e => setAmount(e.target.value)} min="10" />
            <button className="btn-wizard-next" onClick={handleSendOtp} disabled={loading}>{loading ? "SENDING..." : "GENERATE OTP"}</button>
          </div>
        )}

        {step === 2 && (
          <div className="wizard-step">
            <label>ENTER 6-DIGIT OTP SENT TO {userEmail}</label>
            <input type="text" className="wizard-input otp-field" maxLength="6" value={otp} onChange={e => setOtp(e.target.value)} placeholder="0 0 0 0 0 0" />
            <button className="btn-wizard-next" onClick={handleVerifyOtp} disabled={loading}>{loading ? "VERIFYING..." : "VERIFY & PROCEED"}</button>
          </div>
        )}

        {step === 3 && (
          <div className="wizard-step">
            <label>SECURE CARD PAYMENT VIA STRIPE</label>
            <Elements stripe={stripePromise}>
              <StripePaymentForm 
                campaignId={id} 
                amount={amount} 
                donorEmail={userEmail} // Pass email to Stripe form
                onSuccess={() => navigate("/donor/my-donations")} 
              />
            </Elements>
          </div>
        )}
      </div>
    </div>
  );
}

export default Donate;