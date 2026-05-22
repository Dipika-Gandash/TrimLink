import { LoaderCircle } from "lucide-react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoaderCircle className="h-10 w-10 animate-spin text-violet-500" />
    </div>
  );
};

export default Spinner;