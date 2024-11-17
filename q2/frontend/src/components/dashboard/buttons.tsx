import { Eraser, Share2, Trash2 } from "lucide-react"

import { encodeFilterState } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { clearPersistedState, removePersistedState } from "@/lib/cookies"

interface ButtonsProps {
  clearStates: () => void
  startDate: Date
  endDate: Date
  age: string
  gender: string
  selectedFeature: string | null
}

export const Buttons = ({
  clearStates,
  startDate,
  endDate,
  age,
  gender,
  selectedFeature,
}: ButtonsProps) => {
  const handleShare = () => {
    const filterParams = encodeFilterState(
      startDate,
      endDate,
      age,
      gender,
      selectedFeature
    )
    const baseUrl = window.location.origin + window.location.pathname
    const shareableUrl = `${baseUrl}?${filterParams}`

    navigator.clipboard
      .writeText(shareableUrl)
      .then(() => {
        alert("Link copied to clipboard!")
      })
      .catch(() => {
        alert("Failed to copy link to clipboard")
      })
  }

  return (
    <div className="flex gap-x-2">
      <Button
        onClick={() => {
          clearPersistedState()
          clearStates()
        }}
        variant="secondary"
      >
        <Eraser />
        Clear
      </Button>
      <Button
        onClick={() => {
          removePersistedState()
          clearStates()
        }}
        variant="destructive"
      >
        <Trash2 />
        Remove
      </Button>
      <Button className="bg-blue-600 hover:bg-blue-500" onClick={handleShare}>
        <Share2 />
        Share
      </Button>
    </div>
  )
}
