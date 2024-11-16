export type User = {
  id: string
  name: string
  email: string
}
import z from "zod"

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})
export type authType = z.infer<typeof authSchema>
export type SheetData = {
  Day: Date
  Age: string
  Gender: string
  A: number
  B: number
  C: number
  D: number
  E: number
  F: number
}
