export interface Task {
  id: string
  project: string
  type: string
  description: string
  hours: number
  createdAt: string
}

export interface DayEntry {
  date: string
  tasks: Task[]
  dayTotal: number
}

export interface TimesheetData {
  week: number
  year: number
  days: DayEntry[]
  totals: {
    week: number
    target: number
    remaining: number
  }
} 

export interface LocalTasks {
  id?: string
  date: string
  project: string
  type: string
  description: string
  hours: number
}