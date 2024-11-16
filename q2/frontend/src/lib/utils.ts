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

export const loadPersistedState = () => {
  const savedState = Cookies.get("appState")
  if (savedState) {
    const { age, gender, feature } = JSON.parse(savedState)
    return { age, gender, feature }
  }
  return { age: "", gender: "", feature: "" }
}

export const persistState = (
  age: string,
  gender: string,
  feature: string | null
) => {
  Cookies.set(
    "appState",
    JSON.stringify({
      age,
      gender,
      feature,
    })
  )
}

export const clearPersistedState = () => {
  Cookies.set("appState", JSON.stringify({ age: "", gender: "", feature: "" }))
}

export const removePersistedState = () => {
  Cookies.remove("appState")
}
