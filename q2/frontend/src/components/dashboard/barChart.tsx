import { useEffect, useState } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Line,
  LineChart,
  Tooltip,
} from "recharts"

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { SheetData } from "@/lib/types"

interface BarChartProps {
  data: SheetData[]
  startDate: Date
  endDate: Date
  age?: String
  gender?: String
  selectedFeature: string | null
  setSelectedFeature?: React.Dispatch<React.SetStateAction<string | null>>
}

const chartConfig = {
  total: {
    label: "Total",
    color: "red",
  },
} satisfies ChartConfig

export const BarChartComponent = ({
  data,
  startDate,
  endDate,
  age,
  gender,
  selectedFeature,
  setSelectedFeature,
}: BarChartProps) => {
  const [drilldownData, setDrilldownData] = useState<any[] | null>(null)

  const filteredData = data.filter((entry) => {
    const entryDate = new Date(entry.Day)
    const dateInRange = entryDate >= startDate && entryDate <= endDate
    const ageMatch = !age || entry.Age === age
    const genderMatch = !gender || entry.Gender === gender

    return dateInRange && ageMatch && genderMatch
  })

  const totals = filteredData.reduce(
    (acc, entry) => {
      acc.A += entry.A
      acc.B += entry.B
      acc.C += entry.C
      acc.D += entry.D
      acc.E += entry.E
      acc.F += entry.F
      return acc
    },
    { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 }
  )

  const chartData = [
    { feature: "A", total: totals.A, fill: "#8884d8" },
    { feature: "B", total: totals.B, fill: "#82ca9d" },
    { feature: "C", total: totals.C, fill: "#ffc658" },
    { feature: "D", total: totals.D, fill: "#ff6384" },
    { feature: "E", total: totals.E, fill: "#36a2eb" },
    { feature: "F", total: totals.F, fill: "#8b5cf6" },
  ]

  useEffect(() => {
    if (selectedFeature) {
      const newDrilldownData = filteredData.map((entry) => ({
        date: new Date(entry.Day).toLocaleDateString(),
        value: entry[selectedFeature as keyof typeof entry],
        fill: chartData.find((d) => d.feature === selectedFeature)?.fill,
      }))

      newDrilldownData.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      )

      setDrilldownData(newDrilldownData)
    } else {
      setDrilldownData(null)
    }
  }, [filteredData, selectedFeature, age, gender, startDate, endDate])

  const handleBarClick = (data: any) => {
    const feature = data.feature
    if (setSelectedFeature) {
      setSelectedFeature(feature)
    }

    const drilldownData = filteredData.map((entry) => ({
      date: new Date(entry.Day).toLocaleDateString(),
      value: entry[feature as keyof typeof entry],
      fill: chartData.find((d) => d.feature === feature)?.fill,
    }))

    drilldownData.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )

    setDrilldownData(drilldownData)
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <ResponsiveContainer width="100%" height={400}>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData} layout="vertical">
            <CartesianGrid
              vertical={false}
              stroke="#ccc"
              strokeDasharray="5 5"
            />
            <XAxis dataKey="total" type="number" tickMargin={10} />
            <YAxis
              dataKey="feature"
              type="category"
              tickLine={false}
              tickMargin={10}
            />
            <Bar dataKey="total" onClick={handleBarClick} cursor="pointer" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
          </BarChart>
        </ChartContainer>
      </ResponsiveContainer>

      {drilldownData && (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={drilldownData}>
            <CartesianGrid
              vertical={false}
              stroke="#ccc"
              strokeDasharray="3 5"
            />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke={
                chartData.find((d) => d.feature === selectedFeature)?.fill
              }
              strokeWidth={2}
              dot
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
