import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import Spinner from "@/components/common/Spinner";

const PublicRoutes = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoutes;
