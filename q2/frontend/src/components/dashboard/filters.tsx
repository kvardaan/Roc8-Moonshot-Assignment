import {
  Select as SelectComponent,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { DatePickerWithRange } from "@/components/dashboard/datePicker"

interface FiltersProps {
  setStartDate: React.Dispatch<React.SetStateAction<Date>>
  setEndDate: React.Dispatch<React.SetStateAction<Date>>
  setAge: React.Dispatch<React.SetStateAction<string>>
  setGender: React.Dispatch<React.SetStateAction<string>>
}

export const Filters = ({
  setStartDate,
  setEndDate,
  setAge,
  setGender,
}: FiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      <DatePickerWithRange
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <div className="flex items-center justify-between gap-2">
        <SelectComponent onValueChange={setAge}>
          <SelectTrigger className="w-24">
            <SelectValue placeholder="Age" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="15-25">15-25</SelectItem>
            <SelectItem value=">25">25</SelectItem>
          </SelectContent>
        </SelectComponent>
        <SelectComponent onValueChange={setGender}>
          <SelectTrigger className="w-24">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
          </SelectContent>
        </SelectComponent>
      </div>{" "}
    </div>
  )
}
