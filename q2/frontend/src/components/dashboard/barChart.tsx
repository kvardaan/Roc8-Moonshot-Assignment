import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface BarChartProps {
  data: {
    Day: Date
    Age: string
    Gender: string
    A: number
    B: number
    C: number
    D: number
    E: number
    F: number
  }[]
  startDate: Date
  endDate: Date
}

const chartConfig = {
  total: {
    label: "Total",
    color: "red",
  },
} satisfies ChartConfig

export const BarChartComponent: React.FC<BarChartProps> = ({
  data,
  startDate,
  endDate,
}) => {
  const filteredData = data.filter(
    (entry) => entry.Day >= startDate && entry.Day <= endDate
  )

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

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData} layout="vertical">
        <CartesianGrid vertical={false} stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="total" type="number" tickMargin={10} />
        <YAxis
          dataKey="feature"
          type="category"
          tickLine={false}
          tickMargin={10}
        />
        <Bar dataKey="total" fill="#8884d8" />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
      </BarChart>
    </ChartContainer>
  )
}
