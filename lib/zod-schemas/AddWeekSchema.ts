import { z } from "zod"

export const addEntrySchema = z.object({
  project: z.string().min(1, "Project is required"),
  type: z.enum(["Bug fix", "Feature", "Dev"]),
  description: z.string().min(5, "Description is too short"),
  hours: z.number().min(1).max(15),
})

export type AddEntryFormValues = z.infer<typeof addEntrySchema>
