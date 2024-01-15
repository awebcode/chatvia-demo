import Dashboard from "../features/dashboard/pages/Dashboard";
import Forgot from "../features/auth/pages/Forgot";
import NotFound from "../components/common/NotFound/NotFound";
import ResetPassword from "../features/auth/pages/ResetPassword";
import SignIn from "../features/auth/pages/SignIn";
import SignUp from "../features/auth/pages/SignUp";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },

  {
    path: "signup",
    element: <SignUp />,
  },

  {
    path: "forgot",
    element: <Forgot />,
  },

  {
    path: "reset/:email",
    element: <ResetPassword />,
  },

  {
    path: "dashboard",
    element: <Dashboard />,
    errorElement: <NotFound />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
