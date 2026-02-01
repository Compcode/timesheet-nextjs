import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { Ellipsis } from "lucide-react"
import { EditDeleteProps } from "@/types/EditDeleteProps"
import { mutate } from "swr"
import { LocalTasks } from "@/types/TimesheetProps"

export default function EditDeleteDropdown({taskId, date, week} : EditDeleteProps) {

  const handleDelete = async () => {
    try {
      const lsKey = `week-${week}`
      const existing: LocalTasks[] = JSON.parse(localStorage.getItem(lsKey) || "[]")
      const filtered = existing.filter(task => !(task.id === taskId && task.date === date))
      localStorage.setItem(lsKey, JSON.stringify(filtered))

      await fetch(`/api/timesheets/${week}?date=${date}&taskId=${taskId}`, {
        method: "DELETE",
      })
      console.log("Task id is:", taskId)

      mutate(`/api/timesheets/${week}`)
    } catch (err) {
      console.error("Failed to delete task:", err)
      alert("Failed to delete task. Please try again.")
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="hover:bg-gray-200 h-5 w-3">
            <Ellipsis/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white min-w-22">
        <DropdownMenuGroup className="rounded-g">
          <DropdownMenuItem className="cursor-pointer">
            <span className="text-[15px]"> Edit </span>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer" onClick={handleDelete}>
            <span className="text-[15px] text-red-400"> Delete </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
