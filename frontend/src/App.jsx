import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PublicNavbar from "./components/PublicNavbar";
import HeroSection from "./components/HomePage";
import LoginForm from "./components/Users/Login";
import RegistrationForm from "./components/Users/Register";
import PrivateNavbar from "./components/PrivateNavbar";
import { useSelector } from "react-redux";
import AddCategory from "./components/Category/AddCategory";
import UserProfile from "./components/Users/UserProfile";
import TransactionForm from "./components/Transactions/TransactionForm";
import CategoriesList from "./components/Category/CategoriesList";
import UpdateCategory from "./components/Category/UpdateCategory";

export default function App() {
  const users = useSelector((state) => state?.auth?.user);

  return (
    <Router>
      {users ? <PrivateNavbar /> : <PublicNavbar />}
      <Routes>
        <Route path='/' element={<HeroSection />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegistrationForm />} />
        <Route path='/add-category' element={<AddCategory />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/add-transaction' element={<TransactionForm />} />
        <Route path='/categories' element={<CategoriesList />} />
        <Route path='/update-category/:id' element={<UpdateCategory />} />
      </Routes>
    </Router>
  );
}
