import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function OAuthRedirect() {
  const navigate = useNavigate();
  const selectedRole = localStorage.getItem("selectedRole");

  useEffect(() => {
    const resolveAuth = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const tokenFromUrl = params.get("token");

        if (tokenFromUrl) {
          localStorage.setItem("token", tokenFromUrl);
          API.defaults.headers.common.Authorization = `Bearer ${tokenFromUrl}`;
          window.history.replaceState({}, document.title, "/oauth2/redirect");
        }

        const token = localStorage.getItem("token");
        if (!token) throw new Error("JWT missing");

        let res;
        try {
          res = await API.get("/api/auth/me");
        } catch (err) {
          if (err.response?.status === 404 && selectedRole) {
            await API.get(`/api/auth/register?role=${selectedRole}`);
            res = await API.get("/api/auth/me");
          } else {
            throw err;
          }
        }

        const user = res.data.user;

localStorage.setItem("token", res.data.token);
API.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;

localStorage.setItem("user", JSON.stringify(user));
localStorage.setItem("role", user.role);
localStorage.removeItem("selectedRole");

        navigate(
          user.role === "ORGANIZER"
            ? "/organizer/dashboard"
            : "/donor/explore",
          { replace: true }
        );
      } catch (err) {
        console.error("OAuth redirect failed:", err);
        navigate("/", { replace: true });
      }
    };

    resolveAuth();
  }, [navigate, selectedRole]);

  return (
    <div style={containerStyle}>
      <div>
        <p>Signing you in…</p>
        <div style={spinnerStyle} />
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

const containerStyle = {
  height: "100vh",
  display: "grid",
  placeItems: "center",
  background:
    "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://plus.unsplash.com/premium_photo-1730005721833-62fbdb9193d3') center/cover",
  color: "white",
  textAlign: "center"
};

const spinnerStyle = {
  marginTop: "18px",
  width: "34px",
  height: "34px",
  border: "3px solid rgba(255,255,255,0.3)",
  borderTop: "3px solid white",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
  marginInline: "auto"
};

export default OAuthRedirect;
