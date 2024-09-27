import { Routes, Route } from "react-router-dom";  // Only import Routes, not BrowserRouter
import Home from "../pages/Home";
import Policies from "../pages/Policies";
import AdminDashboard from "../pages/AdminDashboard";
import UserLogin from "../components/UserLogin";
import UserSignup from "../components/UserSignup";
import ViewPolicy from "../components/ViewPolicy";
import AddPolicyModal from "../components/AddPolicyModal";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import SaamPage from "../pages/SaamPage";
import UserHome from "../pages/UserHome";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/policies" element={<Policies />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/signup" element={<UserSignup />} />
      <Route path="/view-policy" element={<ViewPolicy />} />
      <Route path="/add-policy" element={<AddPolicyModal />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/saam" element={<SaamPage />} />
      <Route path="/user" element={<UserHome />} />
    </Routes>
  );
};

export default AppRoutes;
