"use client"

import { addDays, format } from "date-fns"
import { useEffect, useState } from "react"
import { DateRange } from "react-day-picker"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  setStartDate: React.Dispatch<React.SetStateAction<Date>>
  setEndDate: React.Dispatch<React.SetStateAction<Date>>
}

export function DatePickerWithRange({
  className,
  setStartDate,
  setEndDate,
}: DatePickerProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 9, 4),
    to: addDays(new Date(2022, 9, 29), 0),
  })

  useEffect(() => {
    setStartDate(date?.from as Date)
    setEndDate(date?.to as Date)
  }, [date, setStartDate, setEndDate])

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
