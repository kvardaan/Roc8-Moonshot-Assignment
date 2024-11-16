import { Rocket } from "lucide-react"
import { Link } from "react-router-dom"

import { User } from "@/lib/types"
import { ProfileButton } from "@/components/dashboard/profileButton"

interface AppBarProps {
  user: User | null
}

export const AppBar = ({ user }: AppBarProps) => {
  return (
    <header className="w-full top-0 p-3 md:p-4 border-b">
      <div className="flex items-center justify-between w-full h-full">
        <div className="flex flex-row justify-center items-center gap-x-3 text-xl">
          <Link to="/" className="border p-2 rounded-lg">
            <Rocket />
          </Link>
        </div>
        <div className="flex justify-between items-center gap-x-1">
          <div className="flex gap-x-3 items-center">
            <div className="flex items-center gap-x-3">
              <ProfileButton name={user?.name} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
