import { Navigate, Outlet } from "react-router-dom"

import { isAuthenticated } from "@/lib/utils"

export const AuthLayout = () => {
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" />
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Outlet />
    </div>
  )
}
