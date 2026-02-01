"use client"
import { Button } from "@/components/ui/button"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TableSheetProps } from "@/types/TableSheetProps"
import { LocalTasks } from "@/types/TimesheetProps"
import { WeekData } from "@/types/WeekData"
import { MoveDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function TableSheet({pageCount, currentPage} : TableSheetProps) {
  const router = useRouter()
  const [weeks, setWeeks] = useState<WeekData[]>([]);
  const [loading, setLoading] = useState(true);

  const start = (currentPage - 1) * pageCount
  const end = start + pageCount
  const visibleWeeks = weeks.slice(start, end)

  const fetchWeeks = async () => {
    try {
      const res = await fetch("/api/week");
      const data: WeekData[] = await res.json();
      // const weeksWithStatus = data.map((week) => ({
      //   ...week,
      //   status:
      //     week.totalHrs >= 40
      //       ? "COMPLETED"
      //       : week.totalHrs < 40 && week.totalHrs > 0
      //       ? "INCOMPLETE"
      //       : "MISSING",
      // }));
      const weeksWithStatus = data.map((week) => {
        const localTasks: LocalTasks[] = JSON.parse(localStorage.getItem(`week-${week.week}`) || "[]")
        const totalHrs = localTasks.length
          ? localTasks.reduce((sum, t) => sum + t.hours, 0)
          : week.totalHrs

        const status =
          totalHrs >= 40
            ? "COMPLETED"
            : totalHrs > 0
            ? "INCOMPLETE"
            : "MISSING"

        return { ...week, totalHrs, status }
      })

      setWeeks(weeksWithStatus);

    } catch (error) {
      console.error("Failed to fetch weeks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeeks();
  }, []);

  const goToWeek = (week: number) => {
    router.replace(`/dashboard/weeklyTimesheet/${week}`);
  };

  if (loading) return <p className="p-4">Loading weeks...</p>;

  return (
    <Table className="">
        <TableHeader>
        <TableRow className="flex bg-gray-200 border-b-gray-300">
          <TableHead className="flex justify-between items-center w-30 bg-gray-200">
            WEEK # <MoveDown className="w-3 h-3"/>
          </TableHead>

          <TableHead className="flex gap-2 items-center w-110">
            DATE <MoveDown className="w-3 h-3"/>
          </TableHead>

          <TableHead className="flex gap-3 items-center w-120">
            STATUS <MoveDown className="w-3 h-3"/>
          </TableHead>

          <TableHead className=" flex items-center text-right w-20">
            ACTIONS
          </TableHead>

        </TableRow>
      </TableHeader>

      <TableBody className="flex flex-col">
        {visibleWeeks.map((week) => (
          <TableRow key={week.week} className="flex border-b-gray-300 h-10">
            <TableCell className="w-30 bg-gray-200">{week.week}</TableCell>
            <TableCell className="w-110">{week.date}</TableCell>
            <TableCell
              className={`w-120 font-semibold ${
                week.status === "COMPLETED"
                  ? "text-green-500"
                  : week.status === "INCOMPLETE"
                  ? "text-yellow-600"
                  : "text-red-400"
              }`}
            >
            <Button className={`h-6 text-[12px] font-semibold ${week.status === "COMPLETED"
                  ? "bg-green-100"
                  : week.status === "INCOMPLETE" 
                  ? "bg-yellow-100"
                  : "bg-red-100" }`}> 
              {week.status} 
            </Button>
            </TableCell>
            <TableCell className="w-20 text-right">
              <Button
                className="text-blue-400 text-[17px]"
                onClick={() => goToWeek(week.week)}
              >
                {week.status === "COMPLETED" ? 'View' : week.status === 'INCOMPLETE' ? 'Update' : 'Create'}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
