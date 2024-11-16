import { SheetData } from "@/lib/types"

export const fetchSheetData = async (): Promise<SheetData[]> => {
  const sheetID = "1l7GstWHc69HPV0irSdvoMIyHgtufUPKsbtCiNw7IKR0"
  const sheetName = "Sheet3"
  const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:csv&sheet=${sheetName}`

  const response = await fetch(url)
  const csvData = await response.text()

  // Convert CSV data to JSON
  const rows = csvData.split("\n").map((row) => row.split(","))
  const headers = rows[0].map((header) => header.trim().replace(/"/g, "")) // Clean up headers

  // Row mapping to objects with type conversions
  const data = rows.slice(1).map((row) => {
    const rawObject: Record<string, string> = row.reduce<
      Record<string, string>
    >((acc, value, index) => {
      acc[headers[index]] = value.trim()
      return acc
    }, {})

    // Raw object transformation to the desired type
    return {
      Day: new Date(
        rawObject["Day"].replace(/"/g, "").split("/").reverse().join("-")
      ), // Date conversion
      Age: rawObject["Age"].replace(/"/g, ""), // Clean up
      Gender: rawObject["Gender"].replace(/"/g, ""),
      A: parseInt(rawObject["A"].replace(/"/g, ""), 10) / 3600, // Clean up and parse as number
      B: parseInt(rawObject["B"].replace(/"/g, ""), 10) / 3600,
      C: parseInt(rawObject["C"].replace(/"/g, ""), 10) / 3600,
      D: parseInt(rawObject["D"].replace(/"/g, ""), 10) / 3600,
      E: parseInt(rawObject["E"].replace(/"/g, ""), 10) / 3600,
      F: parseInt(rawObject["F"].replace(/"/g, ""), 10) / 3600,
    }
  })

  return data
}
