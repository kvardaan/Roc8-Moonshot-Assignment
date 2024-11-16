import { useEffect, useState } from "react"
import { Eraser, Trash2 } from "lucide-react"

import {
  clearPersistedState,
  getAuthToken,
  loadPersistedState,
  persistState,
  removePersistedState,
} from "@/lib/utils"
import { SheetData } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { fetchSheetData } from "@/lib/api/sheetData"
import { Select } from "@/components/dashboard/select"
import { DatePickerWithRange } from "@/components/dashboard/datePicker"
import { BarChartComponent as BarChart } from "@/components/dashboard/barChart"

const BACKEND_ROUTE = import.meta.env.VITE_BACKEND_ROUTE

export const Dashboard = () => {
  const token = getAuthToken()
  const [data, setData] = useState<SheetData[]>([])
  const [startDate, setStartDate] = useState<Date>(new Date("2022-10-04"))
  const [endDate, setEndDate] = useState<Date>(new Date("2022-10-29"))
  const [age, setAge] = useState<string>(() => loadPersistedState().age)
  const [gender, setGender] = useState<string>(
    () => loadPersistedState().gender
  )
  const [selectedFeature, setSelectedFeature] = useState<string | null>(
    () => loadPersistedState().feature
  )

  // useEffect(() => {
  //   ;(async () => {
  //     const response = await fetch(`${BACKEND_ROUTE}/data`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     const data = await response.json()
  //     setData(data)
  //   })()
  // }, [setData])

  const clearStates = () => {
    setAge("")
    setGender("")
    setSelectedFeature("")
  }

  useEffect(() => {
    ;(async () => {
      const sheetData = await fetchSheetData()
      setData(sheetData)
    })()
  }, [])

  useEffect(() => {
    persistState(age, gender, selectedFeature)
  }, [age, gender, selectedFeature])

  return (
    <main className="flex flex-col items-center justify-center gap-y-4 w-full max-h-fit p-2">
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
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        <DatePickerWithRange
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <Select setAge={setAge} setGender={setGender} />
      </div>

      {data.length > 0 && (
        <div className="w-full md:w-[90%] h-fit p-4 border rounded-md shadow-sm mx-auto">
          <BarChart
            data={data}
            startDate={startDate}
            endDate={endDate}
            age={age}
            gender={gender}
            selectedFeature={selectedFeature}
            setSelectedFeature={setSelectedFeature}
          />
        </div>
      )}
    </main>
  )
}
