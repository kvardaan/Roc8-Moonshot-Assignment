import { twMerge } from "tailwind-merge"
import { clsx, type ClassValue } from "clsx"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface FilterState {
  startDate: string
  endDate: string
  age: string
  gender: string
  feature: string
}

export const encodeFilterState = (
  startDate: Date,
  endDate: Date,
  age: string,
  gender: string,
  selectedFeature: string | null
) => {
  const params = new URLSearchParams()

  params.set("startDate", startDate.toISOString())
  params.set("endDate", endDate.toISOString())
  if (age) params.set("age", age)
  if (gender) params.set("gender", gender)
  if (selectedFeature) params.set("feature", selectedFeature || "")

  return params.toString()
}

export const decodeFilterState = (search: string): Partial<FilterState> => {
  const params = new URLSearchParams(search)
  const state: Partial<FilterState> = {}

  const startDate = params.get("startDate")
  const endDate = params.get("endDate")
  const age = params.get("age")
  const gender = params.get("gender")
  const feature = params.get("feature")

  if (startDate) state.startDate = startDate
  if (endDate) state.endDate = endDate
  if (age) state.age = age
  if (gender) state.gender = gender
  if (feature) state.feature = feature

  return state
}
