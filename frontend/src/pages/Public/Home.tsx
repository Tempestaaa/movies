import { useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [navigate, userInfo]);
  return <div className="">Home</div>;
};

export default Home;
