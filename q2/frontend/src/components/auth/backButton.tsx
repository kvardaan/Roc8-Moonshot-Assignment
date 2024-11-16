"use client"

import { Button } from "@/components/ui/button"
import { NavLink } from "react-router-dom"

interface BackButtonProps {
  href: string
  label: string
}

export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button
      size="sm"
      variant="link"
      className="font-normal w-full h-full"
      asChild
    >
      <NavLink to={href}>{label}</NavLink>
    </Button>
  )
}
