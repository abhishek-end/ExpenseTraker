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
import Dashboard from "./components/Users/Dashboard";
import AuthRoute from "./AuthRoute/AuthRoute";

export default function App() {
  const users = useSelector((state) => state?.auth?.user);

  return (
    <Router>
      {users ? <PrivateNavbar /> : <PublicNavbar />}
      <Routes>
        <Route path='/' element={<HeroSection />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegistrationForm />} />
        <Route
          path='/add-category'
          element={
            <AuthRoute>
              <AddCategory />
            </AuthRoute>
          }
        />
        <Route path='/add-transaction' element={<TransactionForm />} />
        <Route
          path='/categories'
          element={
            <AuthRoute>
              <CategoriesList />
            </AuthRoute>
          }
        />
        <Route path='/update-category/:id' element={<UpdateCategory />} />
        <Route
          path='/dashboard'
          element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <AuthRoute>
              <UserProfile />
            </AuthRoute>
          }
        />
      </Routes>
    </Router>
  );
}
