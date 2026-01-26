import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function OAuthRedirect() {
  const navigate = useNavigate();
  const selectedRole = localStorage.getItem("selectedRole");

  useEffect(() => {
    async function resolveAuth() {
      try {
        // 1️⃣ Read token from URL
        const params = new URLSearchParams(window.location.search);
        const tokenFromUrl = params.get("token");

        // 2️⃣ Save token immediately
        if (tokenFromUrl) {
          localStorage.setItem("token", tokenFromUrl);
          window.history.replaceState({}, document.title, "/oauth2/redirect");
        }

        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("JWT missing after OAuth redirect");
        }
        if (tokenFromUrl) {
  localStorage.setItem("token", tokenFromUrl);

  // 🔴 THIS LINE IS CRITICAL
  API.defaults.headers.common.Authorization = `Bearer ${tokenFromUrl}`;

  window.history.replaceState({}, document.title, "/oauth2/redirect");
}


        // 3️⃣ Fetch current user WITH MANUAL AUTH HEADER (CRITICAL)
        let res;
        try {
          res = await API.get("/api/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        } catch (err) {
          // 4️⃣ If new user → register once
          if (err.response?.status === 404 && selectedRole) {
            await API.get(`/api/auth/register?role=${selectedRole}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });

            // retry after register
            res = await API.get("/api/auth/me", {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
          } else {
            throw err;
          }
        }

        // 5️⃣ Save user info
        const data = res.data;
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("role", data.user.role);
        localStorage.removeItem("selectedRole");

        // 6️⃣ Navigate by role
        if (data.user.role === "ORGANIZER") {
          navigate("/organizer/dashboard", { replace: true });
        } else {
          navigate("/donor/campaigns", { replace: true });
        }

      } catch (error) {
        console.error("OAuth redirect failed:", error);
        navigate("/", { replace: true });
      }
    }

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
