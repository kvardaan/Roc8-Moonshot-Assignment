import Cookies from "js-cookie"
import { twMerge } from "tailwind-merge"
import { clsx, type ClassValue } from "clsx"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAuthToken(): string | null {
  return Cookies.get("token") || null
}

export function setAuthToken(token: string) {
  localStorage.setItem("token", token)
  Cookies.set("token", token)
}

export function clearAuthToken() {
  localStorage.removeItem("token")
  Cookies.remove("token")
}

export const isAuthenticated = (): boolean => {
  const token = getAuthToken()
  return token !== null
}
