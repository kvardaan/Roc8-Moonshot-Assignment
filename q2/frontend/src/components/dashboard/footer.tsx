import { LogOut } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { clearAuthToken, getAuthToken } from "@/lib/utils"

const BACKEND_ROUTE = import.meta.env.VITE_BACKEND_ROUTE

export const Footer = () => {
  const token = getAuthToken()
  const navigate = useNavigate()

  const logout = async () => {
    await fetch(`${BACKEND_ROUTE}/auth/logout`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    clearAuthToken()
    navigate("/login")
  }

  return (
    <footer className="w-full bottom-0 p-3 md:p-4 border-t">
      <div className="flex flex-row justify-between gap-3">
        <Link
          to="/"
          className="flex gap-2 font-medium text-sm md:text-lg items-center"
        >
          Dashboard
        </Link>
        <Button onClick={() => logout()}>
          <LogOut className="w-4 h-4" />
          Sign out
        </Button>
      </div>
    </footer>
  )
}
