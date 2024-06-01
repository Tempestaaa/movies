import { Outlet } from "react-router-dom";
import CustomSide from "../../components/CustomSide";

const DashboardLayout = () => {
  const tabs = [
    {
      name: "Dashboard",
      link: "",
    },
    {
      name: "Movies List",
      link: "movies",
    },
    {
      name: "Create movie",
      link: "create-movie",
    },
    {
      name: "Users",
      link: "users",
    },
    {
      name: "Genres",
      link: "genres",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-0">
      <aside className="md:w-60 px-2">
        <CustomSide tabs={tabs} />
      </aside>

      <section className="flex rounded-md flex-1 px-2 md:px-4 pb-4 overflow-auto">
        <Outlet />
      </section>
    </div>
  );
};

export default DashboardLayout;
