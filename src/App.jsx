import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Public Pages
import Landing from "./pages/landing/Landing";
import OAuthRedirect from "./auth/OAuthRedirect";

// Organizer Components
import OrganizerLayout from "./pages/organizer/OrganizerLayout";
import Dashboard from "./pages/organizer/Dashboard";
import StartCampaign from "./pages/organizer/StartCampaign";
import MyCampaigns from "./pages/organizer/MyCampaigns";
import Profile from "./pages/organizer/Profile";
import CampaignHistory from "./pages/organizer/CampaignHistory";

// Donor Components (Placeholders for your next phase)
import DonorCampaigns from "./pages/donor/Campaigns";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Landing />} />
        <Route path="/oauth2/redirect" element={<OAuthRedirect />} />

        {/* ORGANIZER MODULE - Refactored for High-Density UI */}
        <Route path="/organizer" element={<OrganizerLayout />}>
          {/* Default to dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />
          
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="my-campaigns" element={<MyCampaigns />} />
          <Route path="profile" element={<Profile />} />
          <Route path="history" element={<CampaignHistory />} />
          
          {/* Functional Route: Accessed via Dashboard button */}
          <Route path="start-campaign" element={<StartCampaign />} />
        </Route>

        {/* DONOR MODULE */}
        <Route path="/donor/campaigns" element={<DonorCampaigns />} />
        
        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;