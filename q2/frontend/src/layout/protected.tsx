import { Navigate, Outlet } from "react-router-dom"

import { isAuthenticated } from "@/lib/utils"

export const ProtectedLayout = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}
