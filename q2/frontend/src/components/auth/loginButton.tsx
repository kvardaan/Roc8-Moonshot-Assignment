"use client"

import { LogIn } from "lucide-react"

import { Button } from "@/components/ui/button"
import { NavLink } from "react-router-dom"

export const LoginButton = () => {
  return (
    <Button className="w-20 md:w-24 mx-auto">
      <LogIn />
      <NavLink to="/login">Login</NavLink>
    </Button>
  )
}
