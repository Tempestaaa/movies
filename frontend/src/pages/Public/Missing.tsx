import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <div className="min-h-svh bg-primary text-text grid place-items-center">
      <div>
        <h1 className="uppercase">
          page not found. Look like you took a wrong turn!
        </h1>
        <Link to="/" className="text-blue-500 underline">
          Head back
        </Link>
      </div>
    </div>
  );
};

export default Missing;
