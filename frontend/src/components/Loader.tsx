import { Spinner } from "flowbite-react";

type Props = {
  size: "xs" | "sm" | "md" | "lg" | "xl";
};

const Loader = ({ size }: Props) => {
  return (
    <div className="flex items-center gap-1">
      <Spinner size={size} />
      <span className="pl-3">Loading...</span>
    </div>
  );
};

export default Loader;
