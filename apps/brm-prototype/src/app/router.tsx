import { Navigate, Route, Routes } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage";
import ProfilePage from "../pages/ProfilePage";
import IdeaPage from "../pages/IdeaPage";
import JourneyPage from "../pages/JourneyPage";
import SupervisorPage from "../pages/SupervisorPage";
import RecordPage from "../pages/RecordPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/welcome" replace />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/idea" element={<IdeaPage />} />
      <Route path="/journey" element={<JourneyPage />} />
      <Route path="/journey/:stageId" element={<JourneyPage />} />
      <Route path="/guided" element={<Navigate to="/journey" replace />} />
      <Route path="/decision" element={<Navigate to="/journey/DECISION" replace />} />
      <Route path="/supervisor" element={<SupervisorPage />} />
      <Route path="/record" element={<RecordPage />} />
      <Route path="*" element={<Navigate to="/welcome" replace />} />
    </Routes>
  );
}
