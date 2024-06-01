import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import Home from "./pages/Public/Home";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Public/Register";
import Login from "./pages/Public/Login";
import Missing from "./pages/Public/Missing";
import AdminRoute from "./components/AdminRoute";
import ProfileLayout from "./pages/User/ProfileLayout";
import DashboardLayout from "./pages/Admin/DashboardLayout";
import Dashboard from "./pages/Admin/Dashboard";
import Movies from "./pages/Admin/Movies";
import Users from "./pages/Admin/Users";
import Profile from "./pages/User/Profile";
import ChangePassword from "./pages/User/ChangePassword";
import Favourites from "./pages/User/Favourites";
import Genres from "./pages/Admin/Genres";
import CreateMovie from "./pages/Admin/CreateMovie";
import UpdateMovie from "./pages/Admin/UpdateMovie";

const App = () => {
  return (
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        {/* Private Route */}
        <Route element={<PrivateRoute />}>
          <Route path="profile" element={<ProfileLayout />}>
            <Route index element={<Profile />} />
            <Route path="changepassword" element={<ChangePassword />} />
            <Route path="favourites" element={<Favourites />} />
          </Route>
        </Route>

        {/* Admin Route */}
        <Route element={<AdminRoute />}>
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="movies" element={<Movies />} />
            <Route path="create-movie" element={<CreateMovie />} />
            <Route path="movies/update-movie/:id" element={<UpdateMovie />} />
            <Route path="users" element={<Users />} />
            <Route path="genres" element={<Genres />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Missing />} />
    </Routes>
  );
};

export default App;
