// "use client"

// import { useParams } from "next/navigation"
// import useSWR from "swr"
// import AddEntryModal from "@/components/AddEntryModal"
// import { Progress } from "@/components/ui/progress"
// import { DayEntry, Task, TimesheetData } from "@/types/TimesheetProps"
// import EditDeleteDropdown from "@/components/EditDeleteDropdown"

// const fetcher = (url: string) => fetch(url).then(r => r.json())

// export default function WeeklyTimesheetPage() {
//   const { week } = useParams<{ week: string }>()
//   const { data, isLoading } = useSWR<TimesheetData>(`/api/timesheets/${week}`, fetcher)

//   //fetching the current week
//   const { data: weeksData } = useSWR("/api/week", fetcher)

//   const currentWeekData = weeksData?.find((w: { week: number }) => w.week === Number(week))


//   if (isLoading) return <div className="bg-white p-6 rounded-md">Loading...</div>
//   if (!data) return <div className="bg-white p-6 rounded-md">No data available</div>

//   const totalHours = data.totals.week
//   const maxHours = 40
//   const progressPercentage = Math.min(100, (totalHours / maxHours) * 100)

//   return (
//     <div className="bg-white p-6 rounded-md min-w-140">
//       <div className="flex justify-between items-center mb-6 px-4">
//         <div className="flex flex-col gap-2">
//           <h1 className="md:text-2xl font-bold text-sm">
//             This week&apos;s timesheet
//           </h1>

//           {currentWeekData && (
//             <p className="text-sm text-gray-500 mt-1">
//               {currentWeekData.date}
//             </p>
//           )}
//         </div>

//         <div className="flex flex-col md:gap-2 gap-1">
//           <span className="text-center font-semibold">
//             {totalHours}/{data.totals.target} hrs
//           </span>
//           <div className="flex flex-col">
//             <span className="text-gray-500 text-right text-xs md:text-sm">
//               {progressPercentage.toFixed(0)}%
//             </span>
//             <Progress value={totalHours} max={40}
//               className="md:w-45 md:h-3 w-32 h-2 bg-gray-200 border border-gray-300 rounded-full overflow-hidden [&>div]:bg-orange-500 "
//             />
//           </div>
//         </div>
//       </div>

//       <div className="space-y-6">
//         {data.days.map((day: DayEntry, index : number) => {
//           const dateObj = new Date(day.date)
//           return (
//             <div key={`${day.date}-${index}`} className="p-4">
//               <div className="grid grid-cols-[100px_1fr]">
//                 <div className="flex justify-between items-start mb-3">
//                   <h3 className="font-semibold text-lg">
//                     {dateObj.toLocaleDateString('en-US', { 
//                       month: 'short', 
//                       day: 'numeric' 
//                     })}
//                   </h3>
//                 </div>

//                 <div className="space-y-2 mb-3">
//                   {day.tasks.map((task: Task) => (
//                     <div key={task.id}
//                       className="border flex justify-between items-center h-9 p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors">
//                       <div className="flex items-center mb-1">
//                         <span className="font-semibold text-sm">{task.project}</span>
//                       </div>
//                       <div className="flex gap-2">
//                         <span className="font-semibold text-gray-500 text-sm">
//                           {task.hours} hrs
//                         </span>
//                         <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
//                           {task.type}
//                         </span>
//                         <EditDeleteDropdown />
//                       </div>
//                     </div>
//                   ))}
//                   {totalHours < data.totals.target && (
//                     <AddEntryModal week={week} date={day.date}/>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )
//         })}
//       </div>

//       {/* {data.totals.remaining > 0 && (
//         <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
//           <p className="text-sm text-orange-800">
//             <span className="font-semibold">{data.totals.remaining} hours remaining</span> to reach your weekly target of {data.totals.target} hours.
//           </p>
//         </div>
//       )} */}
//     </div>
//   )
// }


///// New Code

"use client"

import { useParams } from "next/navigation"
import useSWR from "swr"
import AddEntryModal from "@/components/AddEntryModal"
import { Progress } from "@/components/ui/progress"
import { DayEntry, Task, TimesheetData } from "@/types/TimesheetProps"
import EditDeleteDropdown from "@/components/EditDeleteDropdown"

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function WeeklyTimesheetPage() {
  const { week } = useParams<{ week: string }>()

  const { data, isLoading } = useSWR<TimesheetData>(
    `/api/timesheets/${week}`,
    fetcher
  )

  const { data: weeksData } = useSWR("/api/week", fetcher)
  const currentWeek = weeksData?.find(
    (w: { week: number }) => w.week === Number(week)
  )

  if (isLoading || !data) {
    return <div className="bg-white p-6 rounded-md">Loading…</div>
  }

  const totalHours = data.totals.week
  const progressPercentage = Math.min(100, (totalHours / 40))
  console.log(totalHours)


  return (
    <div className="bg-white p-6 rounded-md min-w-140">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 px-4">
        <div>
          <h1 className="text-xl font-bold">This week&apos;s timesheet</h1>
          <p className="text-sm text-gray-500">{currentWeek?.date}</p>
        </div>

        <div>
          <span className="font-semibold flex justify-center">{totalHours}/40 hrs</span>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 text-right">
              {progressPercentage.toFixed(0)}%
            </span>
            <Progress value={totalHours} max={40}
              className="md:w-45 md:h-3 w-32 h-2 bg-gray-200 border border-gray-300 rounded-full overflow-hidden [&>div]:bg-orange-500 "
            />
          </div>
        </div>
      </div>

      {/* Days */}
      <div className="space-y-6">
        {data.days.map((day: DayEntry) => {
          const dateObj = new Date(day.date)

          return (
            <div key={day.date} className="p-4">
              <div className="grid grid-cols-[100px_1fr] gap-4">
                <h3 className="font-semibold text-lg">
                  {dateObj.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </h3>

                <div className="space-y-2">
                  {day.tasks.map((task: Task) => (
                    <div
                      key={task.id}
                      className="flex justify-between items-center bg-gray-50 p-3 rounded-md"
                    >
                      <span className="font-semibold text-sm">
                        {task.project}
                      </span>

                      <div className="flex gap-2 items-center">
                        <span className="text-sm text-gray-500">
                          {task.hours} hrs
                        </span>
                        <span className="text-xs bg-blue-100 px-2 rounded">
                          {task.type}
                        </span>
                        <EditDeleteDropdown taskId={task.id} date={day.date} week={week} />
                      </div>
                    </div>
                  ))}

                  <AddEntryModal week={week} date={day.date} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

