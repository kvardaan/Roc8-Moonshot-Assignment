import { useEffect, useState } from "react"

import { SheetData } from "@/lib/types"
import { fetchSheetData } from "@/lib/api/sheetData"
import { DatePickerWithRange } from "@/components/dashboard/datePicker"
import { BarChartComponent as BarChart } from "@/components/dashboard/barChart"

export const Dashboard = () => {
  const [data, setData] = useState<SheetData[]>([])
  const [startDate, setStartDate] = useState<Date>(new Date("2022-10-04"))
  const [endDate, setEndDate] = useState<Date>(new Date("2022-10-29"))

  useEffect(() => {
    ;(async () => {
      const sheetData = await fetchSheetData()
      setData(sheetData)
    })()
  }, [])

  return (
    <main className="flex flex-col items-center gap-y-8 w-full p-2">
      <DatePickerWithRange
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <div className="w-[90%] md:w-1/2 h-1/2 md:h-fit p-4 border rounded-md shadow-sm mx-auto">
        <BarChart data={data} startDate={startDate} endDate={endDate} />
      </div>
    </main>
  )
}
