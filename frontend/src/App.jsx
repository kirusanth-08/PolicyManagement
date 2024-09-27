import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import UserHome from "./pages/UserHome";
import Policies from "./pages/Policies"; 
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import AddPolicyForm from './components/AddPolicyForm';
import UserSignup from './components/UserSignup'; 
import UserLogin from './components/UserLogin';

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/user" element={<UserHome />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/add-policy" element={<AddPolicyForm />} />
          <Route path="/signup" element={<UserSignup />} />  
          <Route path="/login" element={<UserLogin />} />   
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
