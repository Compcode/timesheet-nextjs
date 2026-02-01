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

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/week`)
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

