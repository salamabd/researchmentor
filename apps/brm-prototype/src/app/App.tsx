import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import WelcomePage from "../pages/WelcomePage";
import ProfilePage from "../pages/ProfilePage";
import IdeaPage from "../pages/IdeaPage";
import GuidedPage from "../pages/GuidedPage";
import DecisionPage from "../pages/DecisionPage";
import SupervisorPage from "../pages/SupervisorPage";
import RecordPage from "../pages/RecordPage";
export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" replace />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/idea" element={<IdeaPage />} />
        <Route path="/guided" element={<GuidedPage />} />
        <Route path="/decision" element={<DecisionPage />} />
        <Route path="/supervisor" element={<SupervisorPage />} />
        <Route path="/record" element={<RecordPage />} />
        <Route path="*" element={<Navigate to="/welcome" replace />} />
      </Routes>
    </Layout>
  );
}
