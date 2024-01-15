import * as React from "react";

import { Navigate } from "react-router-dom";
import { cookies } from "../../../utils";
import { handleGetSettings } from "../../../features/dashboard/dashboardThunk";
import { handleGetUser } from "../../../features/auth/authThunk";
import { useAppDispatch } from "../../../app/store";

export interface IAuthenticatedProps {
  children: React.ReactNode;
}

export function AuthenticatedLayout({ children }: IAuthenticatedProps) {
  const isLoggedIn = cookies.getCookie("user");
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(handleGetUser());
    dispatch(handleGetSettings());
  }, [dispatch]);

  if (!isLoggedIn) return <Navigate to="/" />;
  else return <>{children}</>;
}
