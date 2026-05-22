import useAuth from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import Spinner from "@/components/common/Spinner";

 const ProtectedRoutes = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />

  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

export default ProtectedRoutes;
