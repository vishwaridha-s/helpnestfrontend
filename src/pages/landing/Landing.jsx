import "./Landing.css";

function Landing() {
  const OAUTH_URL =
    import.meta.env.VITE_API_BASE_URL + "/oauth2/authorization/google";

  const handleOAuth = (role) => {
    localStorage.setItem("selectedRole", role);
    window.location.href = OAUTH_URL;
  };

  const handleLogin = () => {
    localStorage.removeItem("selectedRole");
    window.location.href = OAUTH_URL;
  };

  return (
    <div className="landing-container">
      <div className="landing-overlay" />

      <div className="brand">
        <div className="logo-placeholder">◎</div>
        <span className="brand-name">HelpNest</span>
      </div>

      <div className="hero-text">
        <span className="hero-small">Together we can</span>
        <h1 className="hero-main">
          BEGIN WITH <br />
          <span>KINDNESS</span>
        </h1>
        <div className="hero-accent" />
      </div>

      <div className="about-text">
        <p>
          At <strong>HelpNest</strong>, we believe kindness becomes powerful when
          it’s made actionable. Our platform brings compassion and technology
          together to help individuals and organizations support causes that
          truly matter.
          <br />
          <br />
          Every campaign represents hope. Every contribution creates impact.
          Together, we’re nurturing a community built on empathy, trust, and
          meaningful change.
        </p>
      </div>

      <div className="landing-card glass">
        <p className="cta-text">Join the HelpNest community</p>

        <p style={{ fontSize: "16px", opacity: 0.85, marginBottom: "32px" }}>
          Register to start your journey — or login if you already have an
          account.
        </p>

        <div className="landing-actions">
          <button
            className="btn primary oauth-btn"
            onClick={() => handleOAuth("DONOR")}
          >
            Register as Donor
          </button>

          <button
            className="btn secondary oauth-btn"
            onClick={() => handleOAuth("ORGANIZER")}
          >
            Register as Organizer
          </button>
        </div>

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

        <div
          style={{
            margin: "28px 0",
            height: "1px",
            background: "rgba(255,255,255,0.25)",
          }}
        />

        <p style={{ fontSize: "14px", opacity: 0.75 }}>
          🔒 Secure authentication powered by Google OAuth
        </p>
      </div>
    </div>
  );
}

export default Landing;
