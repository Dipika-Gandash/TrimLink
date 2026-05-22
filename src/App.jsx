import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Link from "./pages/Link";
import RedirectLink from "./pages/RedirectLink";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import PublicRoutes from "./routes/PublicRoutes";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        )
      },
      {
        path: "/auth",
        element: (
          <PublicRoutes>
            <Auth />
          </PublicRoutes>
        )
      },
      {
        path: "/link/:id",
        element: (
          <ProtectedRoutes>
            <Link />
          </ProtectedRoutes>
        )
      },
      {
        path: "/:id",
        element: (
          <ProtectedRoutes>
            <RedirectLink />
          </ProtectedRoutes>
        )
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;