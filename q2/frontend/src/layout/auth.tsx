import { Navigate, Outlet } from "react-router-dom"

import { isAuthenticated } from "@/lib/cookies"

export const AuthLayout = () => {
  if (isAuthenticated()) {
    const redirectTo = sessionStorage.getItem("redirectTo")
    sessionStorage.removeItem("redirectTo")

    return <Navigate to={redirectTo || "/dashboard"} replace />
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Outlet />
    </div>
  )
}
