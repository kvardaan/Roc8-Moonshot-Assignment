import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react"

import { User } from "@/lib/types"
import { getAuthToken } from "@/lib/utils"
import { AppBar } from "@/components/dashboard/appBar"
import { Footer } from "@/components/dashboard/footer"

const BACKEND_ROUTE = import.meta.env.VITE_BACKEND_ROUTE

export const DashboardLayout = () => {
  const [user, setUser] = useState<User | null>(null)
  const token = getAuthToken()

  useEffect(() => {
    ;(async () => {
      const response = await fetch(`${BACKEND_ROUTE}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      setUser(data)
    })()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <AppBar user={user} />
      <main className="flex-grow flex flex-row gap-2 w-full p-3">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
