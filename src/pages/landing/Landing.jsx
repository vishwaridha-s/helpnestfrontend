import "./landing.css";

function Landing() {
  const OAUTH_URL = "http://localhost:8080/oauth2/authorization/google";

  // REGISTER FLOW (role chosen)
  const handleOAuth = (role) => {
    // Used ONLY for registration
    localStorage.setItem("selectedRole", role);
    window.location.href = OAUTH_URL;
  };

  // LOGIN FLOW (existing user)
  const handleLogin = () => {
    // Role comes from DB
    localStorage.removeItem("selectedRole");
    window.location.href = OAUTH_URL;
  };

  return (
    <div className="landing-container">
      <div className="landing-overlay" />

      {/* BRAND / LOGO */}
      <div className="brand">
        <div className="logo-placeholder">◎</div>
        <span className="brand-name">HelpNest</span>
      </div>

      {/* HERO TEXT */}
      <div className="hero-text">
        <span className="hero-small">Together we can</span>
        <h1 className="hero-main">
          BEGIN WITH <br />
          <span>KINDNESS</span>
        </h1>
        <div className="hero-accent" />
      </div>

      {/* ABOUT TEXT */}
      <div className="about-text">
        <p>
          At <strong>HelpNest</strong>, we believe kindness becomes powerful when
          it’s made actionable. Our platform brings compassion and technology
          together to help individuals and organizations support causes that
          truly matter.
          <br /><br />
          Every campaign represents hope. Every contribution creates impact.
          Together, we’re nurturing a community built on empathy, trust, and
          meaningful change.
        </p>
      </div>

      {/* CTA CARD */}
      <div className="landing-card glass">
        <p className="cta-text">Join the HelpNest community</p>

        <p style={{ fontSize: "16px", opacity: 0.85, marginBottom: "32px" }}>
          Register to start your journey — or login if you already have an
          account.
        </p>

        {/* REGISTER BUTTONS */}
        <div className="landing-actions">
          {/* REGISTER AS DONOR */}
          <button
            className="btn primary oauth-btn"
            onClick={() => handleOAuth("DONOR")}
          >
            Register as Donor
          </button>

          {/* REGISTER AS ORGANIZER */}
          <button
            className="btn secondary oauth-btn"
            onClick={() => handleOAuth("ORGANIZER")}
          >
            Register as Organizer
          </button>
        </div>

        {/* LOGIN LINK */}
        <p
          style={{
            marginTop: "22px",
            fontSize: "14px",
            opacity: 0.9,
          }}
        >
          Already registered?{" "}
          <span
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              fontWeight: 500,
            }}
            onClick={handleLogin}
          >
            Login
          </span>
        </p>

        {/* DIVIDER */}
        <div
          style={{
            margin: "28px 0",
            height: "1px",
            background: "rgba(255,255,255,0.25)",
          }}
        />

        {/* TRUST LINE */}
        <p style={{ fontSize: "14px", opacity: 0.75 }}>
          🔒 Secure authentication powered by Google OAuth
        </p>
      </div>
    </div>
  );
}

export default Landing;
