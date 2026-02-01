// import { NextResponse } from "next/server"
// import { faker } from "@faker-js/faker"
// import { Task } from "@/types/TimesheetProps"

// // In-memory storage for tasks (resets on server restart)
// // In production, you'd use a database
// const tasksStore: Record<string, Task[]> = {}

// function getMondayOfWeek(week: number, year: number): Date {
//   const firstDayOfYear = new Date(year, 0, 1)
//   const firstDayOfWeek = firstDayOfYear.getDay()
//   const daysToFirstMonday = firstDayOfWeek === 0 ? 1 : firstDayOfWeek === 1 ? 0 : 7 - firstDayOfWeek
  
//   const firstMonday = new Date(firstDayOfYear)
//   firstMonday.setDate(firstDayOfYear.getDate() + daysToFirstMonday)
  
//   const monday = new Date(firstMonday)
//   monday.setDate(firstMonday.getDate() + (week - 1) * 7)
  
//   return monday
// }

// function generateFakeTasks(weekNumber: number, dayIndex: number, count: number): Task[] {
//   faker.seed(weekNumber * 100 + dayIndex)
  
//   return Array.from({ length: count }).map(() => ({
//     id: faker.string.uuid(), //to use as unique key id for data entry into weekly sheet
//     project: faker.company.name(),
//     type: faker.helpers.arrayElement(["Bug fix", "Feature", "Development"]),
//     description: faker.lorem.sentence(),
//     hours: faker.number.int({ min: 1, max: 8 }),
//     createdAt: new Date().toISOString(),
//   }))
// }

// export async function GET(
//   request: Request,
//   { params }: { params: Promise<{ week: string }> }
// ) {
//   try {
//     const { week } = await params
//     const weekNumber = parseInt(week, 10)
    
//     if (isNaN(weekNumber) || weekNumber < 1 || weekNumber > 52) {
//       return NextResponse.json(
//         { error: "Week number must be between 1 and 52" },
//         { status: 400 }
//       )
//     }
    
//     const year = new Date().getFullYear()
//     const today = new Date()
//     today.setHours(0, 0, 0, 0)
    
//     const startOfWeek = getMondayOfWeek(weekNumber, year)
    
//     const days = Array.from({ length: 5 }).map((_, i) => {
//       const date = new Date(startOfWeek)
//       date.setDate(startOfWeek.getDate() + i)
//       date.setHours(0, 0, 0, 0)
      
//       const dateKey = date.toISOString().split('T')[0]
//       const isFuture = date > today
      
//       // Get tasks from store or generate fake ones
//       let tasks = tasksStore[dateKey] || []
      
//       // If no tasks in store and not future, generate fake tasks
//       if (tasks.length === 0 && !isFuture) {
//         tasks = generateFakeTasks(weekNumber, i, faker.number.int({ min: 1, max: 3 }))
//       }
      
//       const dayTotal = tasks.reduce((sum, task) => sum + task.hours, 0)
      
//       return {
//         date: dateKey,
//         tasks,
//         dayTotal: parseFloat(dayTotal.toFixed(1))
//       }
//     })
    
//     const weekTotal = days.reduce((sum, day) => sum + day.dayTotal, 0)
    
//     return NextResponse.json({
//       week: weekNumber,
//       year,
//       days,
//       totals: {
//         week: parseFloat(weekTotal.toFixed(1)),
//         target: 40,
//         remaining: Math.max(0, 40 - weekTotal)
//       }
//     })
    
//   } catch (error) {
//     console.error("Error generating timesheet data:", error)
//     return NextResponse.json(
//       { error: "Failed to generate timesheet data" },
//       { status: 500 }
//     )
//   }
// }

// export async function POST(
//   request: Request,
//   // { params }: { params: Promise<{ week: string }> }
// ) {
//   try {
//     const body = await request.json()
//     const { date, project, type, description, hours } = body
    
//     if (!date || !project || !type || !description || !hours) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       )
//     }
    
//     // Create new task
//     const newTask = {
//       id: faker.string.uuid(),
//       project,
//       type,
//       description,
//       hours: parseFloat(hours),
//       createdAt: new Date().toISOString(),
//     }
    
//     // Store task by date
//     if (!tasksStore[date]) {
//       tasksStore[date] = []
//     }
    
//     tasksStore[date].push(newTask)
    
//     return NextResponse.json(newTask, { status: 201 })
    
//   } catch (error) {
//     console.error("Error adding task:", error)
//     return NextResponse.json(
//       { error: "Failed to add task" },
//       { status: 500 }
//     )
//   }
// }

// export async function PUT(
//   request: Request,
//   // { params }: { params: Promise<{ week: string }> }
// ) {
//   try {
//     const body = await request.json()
//     const { date, taskId, project, type, description, hours } = body
    
//     if (!date || !taskId) {
//       return NextResponse.json(
//         { error: "Missing date or taskId" },
//         { status: 400 }
//       )
//     }
    
//     const tasks = tasksStore[date] || []
//     const taskIndex = tasks.findIndex(t => t.id === taskId)
    
//     if (taskIndex === -1) {
//       return NextResponse.json(
//         { error: "Task not found" },
//         { status: 404 }
//       )
//     }
    
//     // Update task
//     tasks[taskIndex] = {
//       ...tasks[taskIndex],
//       project: project || tasks[taskIndex].project,
//       type: type || tasks[taskIndex].type,
//       description: description || tasks[taskIndex].description,
//       hours: hours ? parseFloat(hours) : tasks[taskIndex].hours,
//     }
    
//     return NextResponse.json(tasks[taskIndex])
    
//   } catch (error) {
//     console.error("Error updating task:", error)
//     return NextResponse.json(
//       { error: "Failed to update task" },
//       { status: 500 }
//     )
//   }
// }

// export async function DELETE(
//   request: Request,
// ) {
//   try {
//     const { searchParams } = new URL(request.url)
//     const date = searchParams.get("date")
//     const taskId = searchParams.get("taskId")
    
//     if (!date || !taskId) {
//       return NextResponse.json(
//         { error: "Missing date or taskId" },
//         { status: 400 }
//       )
//     }
    
//     const tasks = tasksStore[date] || []
//     const taskIndex = tasks.findIndex(t => t.id === taskId)
    
//     if (taskIndex === -1) {
//       return NextResponse.json(
//         { error: "Task not found" },
//         { status: 404 }
//       )
//     }
    
//     // Remove task
//     tasks.splice(taskIndex, 1)
    
//     return NextResponse.json({ success: true })
    
//   } catch (error) {
//     console.error("Error deleting task:", error)
//     return NextResponse.json(
//       { error: "Failed to delete task" },
//       { status: 500 }
//     )
//   }
// }


////// New Code 

import { NextResponse } from "next/server"
import { Task, DayEntry, TimesheetData } from "@/types/TimesheetProps"
import { WeekData } from "@/types/WeekData";

/* ------------------------------------------------------------------ */
/* Persistent in-memory store                                         */
/* ------------------------------------------------------------------ */
const timesheetStore: Record<string, Task[]> =
  (globalThis as { timesheetStore?: Record<string, Task[]> }).timesheetStore ?? {}

;(globalThis as { timesheetStore?: Record<string, Task[]> }).timesheetStore =
  timesheetStore

/* ------------------------------------------------------------------ */
/* Utilities                                                          */
/* ------------------------------------------------------------------ */

function parseWeekRange(range: string): string[] {
  // "5 - 9 January, 2026"
  const match = range.match(/(\d+)\s*-\s*(\d+)\s+(\w+),\s*(\d{4})/)
  if (!match) return []

  const [, startDay, endDay, month, year] = match
  const start = new Date(`${month} ${startDay}, ${year} 00:00:00`)
  const end = new Date(`${month} ${endDay}, ${year} 00:00:00`)

  const dates: string[] = []
  const current = new Date(start)

  while (current <= end) {
    // get YYYY-MM-DD in local time
    const yyyy = current.getFullYear()
    const mm = String(current.getMonth() + 1).padStart(2, "0")
    const dd = String(current.getDate()).padStart(2, "0")
    dates.push(`${yyyy}-${mm}-${dd}`)
    current.setDate(current.getDate() + 1)
  }

  return dates
}



/* ------------------------------------------------------------------ */
/* GET: weekly timesheet                                              */
/* ------------------------------------------------------------------ */
// export async function GET(
//   _req: Request,
//   { params }: { params: Promise<{ week: string }> }
// ) {
//   const week = await params;
//   const weekNumber = Number(week)

//   const res = await fetch(`${process.env.NEXTAUTH_URL}/api/week`)
//   const weeks: WeekData[] = await res.json()

//   const weekMeta = weeks.find(w => w.week === weekNumber)
//   if (!weekMeta) {
//     return NextResponse.json({ error: "Invalid week" }, { status: 404 })
//   }

//   const dates = parseWeekRange(weekMeta.date)

//   const days: DayEntry[] = dates.map(date => {
//     const tasks = timesheetStore[date] ?? []
//     const dayTotal = tasks.reduce((sum, t) => sum + t.hours, 0)

//     return {
//       date,
//       tasks,
//       dayTotal,
//     }
//   })

//   const weekTotal = days.reduce((sum, d) => sum + d.dayTotal, 0)

//   const response: TimesheetData = {
//     week: weekNumber,
//     year: new Date(dates[0]).getFullYear(),
//     days,
//     totals: {
//       week: weekTotal,
//       target: 40,
//       remaining: Math.max(0, 40 - weekTotal),
//     },
//   }

//   return NextResponse.json(response)
// }

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ week: string }> }
) {
  const { week } = await params
  const weekNumber = Number(week)

  if (isNaN(weekNumber)) {
    return NextResponse.json(
      { error: "Invalid week number" },
      { status: 400 }
    )
  }

  const res = await fetch('http://localhost:3000/api/week')
  const weeks: WeekData[] = await res.json()

  const weekMeta = weeks.find(w => w.week === weekNumber)

  if (!weekMeta) {
    return NextResponse.json(
      { error: "Invalid week" },
      { status: 404 }
    )
  }

  const dates = parseWeekRange(weekMeta.date)

  const days: DayEntry[] = dates.map(date => {
    const tasks = timesheetStore[date] ?? []
    const dayTotal = tasks.reduce((sum, t) => sum + t.hours, 0)

    return {
      date,
      tasks,
      dayTotal,
    }
  })

  const weekTotal = days.reduce((sum, d) => sum + d.dayTotal, 0)

  const response: TimesheetData = {
    week: weekNumber,
    year: new Date(dates[0]).getFullYear(),
    days,
    totals: {
      week: weekTotal,
      target: 40,
      remaining: Math.max(0, 40 - weekTotal),
    },
  }

  return NextResponse.json(response)
}


/* ------------------------------------------------------------------ */
/* POST: add task                                                     */
/* ------------------------------------------------------------------ */
export async function POST(request: Request) {
  const body: Omit<Task, "id" | "createdAt"> & { date: string } =
    await request.json()

  const { date, project, type, description, hours } = body

  if (!date || !project || !type || !description || !hours) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  const task: Task = {
    id: crypto.randomUUID(),
    project,
    type,
    description,
    hours,
    createdAt: new Date().toISOString(),
  }

  timesheetStore[date] = [...(timesheetStore[date] ?? []), task]

  return NextResponse.json(task, { status: 201 })
}

/* ------------------------------------------------------------------ */
/* DELETE: remove task                                                */
/* ------------------------------------------------------------------ */
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const date = searchParams.get("date")
  const taskId = searchParams.get("taskId")

  if (!date || !taskId) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 })
  }

  timesheetStore[date] =
    (timesheetStore[date] ?? []).filter(t => t.id !== taskId)

  return NextResponse.json({ success: true })
}

