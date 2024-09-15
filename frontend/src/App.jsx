import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PublicNavbar from "./components/PublicNavbar";
import HeroSection from "./components/HomePage";
import LoginForm from "./components/Users/Login";
import RegistrationForm from "./components/Users/Register";
import PrivateNavbar from "./components/PrivateNavbar";
import { useSelector } from "react-redux";

export default function App() {
  const users = useSelector((state) => state?.auth?.user);

  return (
    <Router>
      {users ? <PrivateNavbar /> : <PublicNavbar />}
      <Routes>
        <Route path='/' element={<HeroSection />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegistrationForm />} />
      </Routes>
    </Router>
  );
}
