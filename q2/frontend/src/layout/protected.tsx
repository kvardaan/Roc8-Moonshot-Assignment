import { Navigate, Outlet, useLocation } from "react-router-dom"

import { isAuthenticated } from "@/lib/cookies"

export const ProtectedLayout = () => {
  const location = useLocation()

  if (!isAuthenticated()) {
    sessionStorage.setItem(
      "redirectTo",
      `${location.pathname}${location.search}`
    )
    return <Navigate to="/login" />
  }

  return <Outlet />
}
