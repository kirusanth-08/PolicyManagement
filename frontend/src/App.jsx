import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./router/AppRoutes";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const App = () => {
  return (
    // <Router>
      <div>
        <NavBar />
        <AppRoutes />
        <Footer />
      </div>
    // </Router>
  );
};

export default App;
