import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import "./history.css";

function MyDonation() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    API.get("/api/donations/my")
      .then(res => setHistory(res.data))
      .catch(err => console.error("History fetch error:", err));
  }, []);
  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date Format";

    return (
      <div className="date-time-stack">
        <span className="date-part">
          {date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          })}
        </span>
        <span className="time-part">
          {date.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          })}
        </span>
      </div>
    );
  };

  return (
    <div className="history-page">
      <header className="history-header">
        <h1>DONATION LOG</h1>
        <p>A comprehensive history of your secure contributions across HelpNest.</p>
      </header>
      <div className="history-table-wrapper">
        <table className="history-table">
          <thead>
            <tr>
              <th>CAMPAIGN TITLE</th>
              <th>AMOUNT</th>
              <th>METHOD</th>
              <th>STATUS</th>
              <th>DATE & TIME</th>
            </tr>
          </thead>
          <tbody>
            {history.length > 0 ? (
              history.map((d, i) => (
                <tr key={i}>
                  <td className="campaign-col">{d.campaignTitle?.toUpperCase()}</td>
                  <td className="amount-col">₹{d.amount?.toLocaleString('en-IN')}</td>
                  <td className="method-col">{d.paymentMethod}</td>
                  <td>
                    <span className={`status-tag ${d.paymentStatus?.toLowerCase()}`}>
                      {d.paymentStatus}
                    </span>
                  </td>
                  <td className="date-col">
                    {formatDateTime(d.paymentTime)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8', fontWeight: 700 }}>
                  NO DONATION RECORDS FOUND
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyDonation;