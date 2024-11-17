import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { SheetData } from "@/lib/types"
import { decodeFilterState } from "@/lib/utils"
import { Filters } from "@/components/dashboard/filters"
import { Buttons } from "@/components/dashboard/buttons"
import { getAuthToken, loadPersistedState, persistState } from "@/lib/cookies"
import { BarChartComponent as BarChart } from "@/components/dashboard/barChart"

const BACKEND_ROUTE = import.meta.env.VITE_BACKEND_ROUTE

export const Dashboard = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const token = getAuthToken()

  const [data, setData] = useState<SheetData[]>([])

  const [startDate, setStartDate] = useState<Date>(() => {
    const urlState = decodeFilterState(location.search)
    return urlState.startDate
      ? new Date(urlState.startDate)
      : new Date("2022-10-04")
  })

  const [endDate, setEndDate] = useState<Date>(() => {
    const urlState = decodeFilterState(location.search)
    return urlState.endDate
      ? new Date(urlState.endDate)
      : new Date("2022-10-29")
  })

  const [age, setAge] = useState<string>(() => {
    const urlState = decodeFilterState(location.search)
    return urlState.age || loadPersistedState().age
  })

  const [gender, setGender] = useState<string>(() => {
    const urlState = decodeFilterState(location.search)
    return urlState.gender || loadPersistedState().gender
  })

  const [selectedFeature, setSelectedFeature] = useState<string | null>(() => {
    const urlState = decodeFilterState(location.search)

    return urlState.feature || loadPersistedState().feature
  })

  const clearStates = () => {
    setAge("")
    setGender("")
    setStartDate(new Date("2022-10-04"))
    setEndDate(new Date("2022-10-29"))
    setSelectedFeature("")
    navigate(".")
  }

  useEffect(() => {
    ;(async () => {
      const response = await fetch(`${BACKEND_ROUTE}/data`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      setData(data)
    })()
  }, [setData])

  useEffect(() => {
    persistState(age, gender, selectedFeature)
  }, [age, gender, selectedFeature])

  return (
    <main className="flex flex-col items-center justify-center gap-y-4 w-full max-h-fit p-2">
      <Buttons
        clearStates={clearStates}
        startDate={startDate}
        endDate={endDate}
        age={age}
        gender={gender}
        selectedFeature={selectedFeature}
      />
      <Filters
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setAge={setAge}
        setGender={setGender}
      />

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
