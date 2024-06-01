import { Button, Dropdown, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useLogoutMutation } from "../redux/User/userApi";
import { logOut } from "../redux/Auth/authSlice";
import { toast } from "react-toastify";

const Nav = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [logoutApi, { isSuccess }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logOut());
      isSuccess && toast.success("User logged out");
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <Navbar fluid className="bg-inherit py-3">
      {/* Logo */}
      <div className="flex gap-2">
        <Navbar.Toggle />
        <Link to="/">
          <Navbar.Brand as="div" className="text-2xl font-medium">
            <span className="py-1 px-2 bg-secondary mr-1 rounded-lg font-extrabold">
              MERN
            </span>
            Movies
          </Navbar.Brand>
        </Link>
      </div>

      {userInfo ? (
        <Dropdown
          label=""
          dismissOnClick
          className="w-60 max-w-60"
          renderTrigger={() => (
            <img
              src={userInfo.image}
              alt={userInfo.username}
              className="w-10 aspect-square rounded-full border-2  absolute md:static top-2 right-2"
            />
          )}
        >
          <Dropdown.Header>
            <span className="font-bold">@{userInfo.username}</span>
          </Dropdown.Header>
          <Link to="/profile">
            <Dropdown.Item>Profile</Dropdown.Item>
          </Link>
          {userInfo.isAdmin && (
            <Link to="/dashboard">
              <Dropdown.Item>Dashboard</Dropdown.Item>
            </Link>
          )}
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogout}>
            <span className="font-semibold text-secondary">Logout</span>
          </Dropdown.Item>
        </Dropdown>
      ) : (
        <Link to="/login">
          <Button color="failure">Login</Button>
        </Link>
      )}
    </Navbar>
  );
};

export default Nav;
