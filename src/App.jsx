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

// Donor Components
import DonorLayout from "./pages/donor/DonorLayout";
import DonorExplore from "./pages/donor/DonorExplore"; 
import DonorMyDonations from "./pages/donor/MyDonation"; 
import DonorPools from "./pages/donor/DonorPools";
import Donate from "./pages/donor/Donate";
import StartPool from "./pages/donor/StartPool";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Landing />} />
        <Route path="/oauth2/redirect" element={<OAuthRedirect />} />

        <Route path="/organizer" element={<OrganizerLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="my-campaigns" element={<MyCampaigns />} />
          <Route path="profile" element={<Profile />} />
          <Route path="history" element={<CampaignHistory />} />
          <Route path="start-campaign" element={<StartCampaign />} />
        </Route>


        <Route path="/donor" element={<DonorLayout />}>
          <Route index element={<Navigate to="explore" replace />} />
          
          <Route path="explore" element={<DonorExplore />} />
          <Route path="my-donations" element={<DonorMyDonations />} />
          <Route path="my-pools" element={<DonorPools />} />
          <Route path="profile" element={<Profile />} />
          

          <Route path="donate/:id" element={<Donate />} />
          <Route path="create-pool" element={<StartPool />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;