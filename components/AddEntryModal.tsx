  // "use client"

  // import {
  //   Dialog,
  //   DialogContent,
  //   DialogHeader,
  //   DialogTitle,
  //   DialogTrigger,
  // } from "@/components/ui/dialog"
  // import { Button } from "@/components/ui/button"
  // import { Textarea } from "@/components/ui/textarea"
  // import {
  //   Select,
  //   SelectContent,
  //   SelectItem,
  //   SelectTrigger,
  //   SelectValue,
  // } from "@/components/ui/select"
  // import { Minus, Plus } from "lucide-react"

  // import { useForm, useWatch } from "react-hook-form"
  // import { zodResolver } from "@hookform/resolvers/zod"
  // import { useState } from "react"

  // import {
  //   addEntrySchema,
  //   AddEntryFormValues,
  // } from "@/lib/zod-schemas/AddWeekSchema"

  // interface AddEntryModalProps {
  //   week: string
  //   date: string
  // }

  // export default function AddEntryModal({ week, date }: AddEntryModalProps) {
  //   const [open, setOpen] = useState(false)
  //   const [isSubmitting, setIsSubmitting] = useState(false)

  //   const form = useForm<AddEntryFormValues>({
  //     resolver: zodResolver(addEntrySchema),
  //     defaultValues: {
  //       project: "",
  //       type: "Dev",
  //       description: "",
  //       hours: 1
  //     },
  //   })

  //   const { setValue, handleSubmit, reset } = form

  //   const hours = useWatch({ control: form.control, name: "hours", defaultValue: 1 })
  //   const project = useWatch({ control: form.control, name: "project", defaultValue: "" })
  //   const type = useWatch({ control: form.control, name: "type", defaultValue: "Dev" })

  //   const onSubmit = async (data: AddEntryFormValues) => {
  //     setIsSubmitting(true)
  //     try {
  //       const weekKey = `week-${week}`
  //       const currentTasks = JSON.parse(localStorage.getItem(weekKey) || "[]")
  //       localStorage.setItem(weekKey, JSON.stringify([...currentTasks, { ...data, date }]))

  //       setOpen(false)
  //       reset()
  //     } catch (error) {
  //       console.error("Error adding task:", error)
  //       alert("Failed to add task. Please try again.")
  //     } finally {
  //       setIsSubmitting(false)
  //     }
  //   }


  //   return (
  //     <Dialog open={open} onOpenChange={setOpen}>
  //       <DialogTrigger asChild>
  //         <Button className="mt-2 w-full bg-blue-100 border-3 border-blue-400 border-dotted text-blue-700 hover:bg-blue-300">
  //           + Add new task
  //         </Button>
  //       </DialogTrigger>

  //       <DialogContent className="bg-white">
  //         <DialogHeader className="border-b-1 border-b-black">
  //           <DialogTitle className="text-xl text-bold pb-2">Add New Entry</DialogTitle>
  //         </DialogHeader>

  //         <form
  //           onSubmit={handleSubmit(onSubmit)}
  //           className="flex flex-col gap-4"
  //         >
  //           {/* Project */}
  //           <label className="font-bold">Select Project *</label>
  //           <Select
  //             value={project}
  //             onValueChange={(v) => setValue("project", v)}
  //           >
  //             <SelectTrigger className="w-80">
  //               <SelectValue placeholder="Select project"/>
  //             </SelectTrigger>
  //             <SelectContent className="bg-white">
  //               <SelectItem value="Website Revamp">Website Revamp</SelectItem>
  //               <SelectItem value="Internal Tool">Internal Tool</SelectItem>
  //               <SelectItem value="Client App">Client App</SelectItem>
  //             </SelectContent>
  //           </Select>

  //           {/* Type */}
  //           <label className="font-bold">Type of work *</label>
  //           <Select
  //             value={type}
  //             onValueChange={(v) =>
  //               setValue("type", v as AddEntryFormValues["type"])
  //             }
  //           >
  //             <SelectTrigger className="w-80">
  //               <SelectValue placeholder="Bug fixes" />
  //             </SelectTrigger>
  //             <SelectContent className="bg-white">
  //               <SelectItem value="Dev">Dev</SelectItem>
  //               <SelectItem value="Bug fix">Bug fix</SelectItem>
  //               <SelectItem value="Feature">Feature</SelectItem>
  //             </SelectContent>
  //           </Select>

  //           {/* Description */}
  //           <label className="font-bold">Task Description</label>
  //           <Textarea
  //             className="h-30 w-100"
  //             placeholder="Task description"
  //             {...form.register("description")}
  //           />

  //           <span className="text-gray-600">A note for extra info</span>

  //           {/* Hours */}
  //           <label className="font-bold">Hours *</label>
  //           <div className="flex items-center gap-4">
  //             <Button
  //               type="button"
  //               variant="outline"
  //               disabled={hours <= 1}
  //               onClick={() => setValue("hours", Math.max(1 , hours - 1))}
  //             >
  //               <Minus />
  //             </Button>

  //             <span className="font-semibold">{hours} hrs</span>

  //             <Button
  //               type="button"
  //               variant="outline"
  //               disabled={hours >= 8}
  //               onClick={() => setValue("hours", Math.min(8, hours + 1))}
  //             >
  //               <Plus />
  //             </Button>
  //           </div>

  //           {/* Actions */}
  //           <div className="flex gap-2">
  //             <Button className="w-55 bg-blue-500" type="submit" disabled={isSubmitting}>
  //               {isSubmitting ? "Adding..." : "Add Entry"}
  //             </Button>

  //             <Button
  //             className="w-55"
  //               type="button"
  //               variant="outline"
  //               onClick={() => {
  //                 reset()
  //                 setOpen(false)
  //               }}
  //               disabled={isSubmitting}
  //             >
  //               Cancel
  //             </Button>

  //           </div>
  //         </form>
  //       </DialogContent>
  //     </Dialog>
  //   )
  // }

  "use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Minus, Plus } from "lucide-react"

import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"

import {
  addEntrySchema,
  AddEntryFormValues,
} from "@/lib/zod-schemas/AddWeekSchema"
import { LocalTasks } from "@/types/TimesheetProps"
import { mutate } from "swr"

interface AddEntryModalProps {
  week: string
  date: string
  onAdded?: () => void // callback to refresh TableSheet
}

export default function AddEntryModal({ week, date, onAdded }: AddEntryModalProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<AddEntryFormValues>({
    resolver: zodResolver(addEntrySchema),
    defaultValues: {
      project: "",
      type: "Dev",
      description: "",
      hours: 1,
    },
  })

  const { setValue, handleSubmit, reset } = form

  const hours = useWatch({ control: form.control, name: "hours", defaultValue: 1 })
  const project = useWatch({ control: form.control, name: "project", defaultValue: "" })
  const type = useWatch({ control: form.control, name: "type", defaultValue: "Dev" })

  const onSubmit = async (data: AddEntryFormValues) => {
    setIsSubmitting(true)
    try {
      // 1️⃣ Save to API
      const response = await fetch(`/api/timesheets/${week}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, ...data }),
      })
      if (!response.ok) throw new Error("Failed to add task")
      // Save to localStorage
      const key = `week-${week}`
      const existing: LocalTasks[] = JSON.parse(localStorage.getItem(key) || "[]")
      const newTask: LocalTasks = {
        id: Date.now(),  // unique numeric ID
        date,
        project: data.project,
        type: data.type,
        description: data.description,
        hours: data.hours,
      }
      localStorage.setItem(key, JSON.stringify([...existing, newTask]))

      // Optionally trigger callback to refresh TableSheet
      if (onAdded) onAdded()

      await mutate(`/api/timesheets/${week}`)
      setOpen(false)
      reset()
    } catch (error) {
      console.error("Error adding task:", error)
      alert("Failed to add task. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-2 w-full bg-blue-100 border-3 border-blue-400 border-dotted text-blue-700 hover:bg-blue-300">
          + Add new task
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white">
        <DialogHeader className="border-b-1 border-b-black">
          <DialogTitle className="text-xl text-bold pb-2">Add New Entry</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Project */}
          <label className="font-bold">Select Project *</label>
          <Select value={project} onValueChange={(v) => setValue("project", v)}>
            <SelectTrigger className="w-80">
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="Website Revamp">Website Revamp</SelectItem>
              <SelectItem value="Internal Tool">Internal Tool</SelectItem>
              <SelectItem value="Client App">Client App</SelectItem>
            </SelectContent>
          </Select>

          {/* Type */}
          <label className="font-bold">Type of work *</label>
          <Select value={type} onValueChange={(v) => setValue("type", v as AddEntryFormValues["type"])}>
            <SelectTrigger className="w-80">
              <SelectValue placeholder="Bug fixes" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="Dev">Dev</SelectItem>
              <SelectItem value="Bug fix">Bug fix</SelectItem>
              <SelectItem value="Feature">Feature</SelectItem>
            </SelectContent>
          </Select>

          {/* Description */}
          <label className="font-bold">Task Description</label>
          <Textarea
            className="h-30 w-100"
            placeholder="Task description"
            {...form.register("description")}
          />
          <span className="text-gray-600">A note for extra info</span>

          {/* Hours */}
          <label className="font-bold">Hours *</label>
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              disabled={hours <= 1}
              onClick={() => setValue("hours", Math.max(1, hours - 1))}
            >
              <Minus />
            </Button>

            <span className="font-semibold">{hours} hrs</span>

            <Button
              type="button"
              variant="outline"
              disabled={hours >= 15}
              onClick={() => setValue("hours", Math.min(15, hours + 1))}
            >
              <Plus />
            </Button>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button className="w-55 bg-blue-500" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Entry"}
            </Button>

            <Button
              className="w-55"
              type="button"
              variant="outline"
              onClick={() => {
                reset()
                setOpen(false)
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
