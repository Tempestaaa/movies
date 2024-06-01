import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { useLogoutMutation } from "../redux/User/userApi";
import { logOut } from "../redux/Auth/authSlice";
import AreYouSure from "./AreYouSure";

type Props = {
  tabs: {
    name: string;
    link: string;
  }[];
};

const CustomSide = ({ tabs }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [active, setActive] = useState("");

  useEffect(() => {
    if (pathname.split("/")[2]) setActive(pathname.split("/")[2]);
    else setActive("");
  }, [pathname]);

  const [logoutApi, { isSuccess }] = useLogoutMutation();
  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logOut());
      isSuccess && toast.success("User logged out") && navigate("/");
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="flex flex-col w-full px-4 py-6 bg-sub rounded-md">
      {tabs.map((item) => (
        <Link
          key={item.link}
          to={item.link}
          className={`p-4 rounded-md transition-all whitespace-nowrap hover:bg-primary ${
            active === item.link && "active"
          }`}
        >
          {item.name}
        </Link>
      ))}

      <div className="border my-4 rounded-full"></div>

      <Button
        color="failure"
        onClick={() => setIsModalOpen(true)}
        className="py-2"
      >
        Logout
      </Button>

      {/* Modal */}
      <AreYouSure
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        handler={handleLogout}
      />
    </div>
  );
};

export default CustomSide;
