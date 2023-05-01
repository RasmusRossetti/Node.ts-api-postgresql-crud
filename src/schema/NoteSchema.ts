// Importing Zod for schema validation
import { z } from "zod"

// Validation schema for creating a new note
export const createNoteSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, { message: "Name must be greater than 1 characters!" }),
    description: z
      .string()
      .min(4, { message: "Descrition must be greater than 4 characters!" })
  })
})

// Validation schema for updating an existing note
export const updateNoteSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z
    .object({
      name: z
        .string()
        .min(1, { message: "Name must be greater than 1 characters!" }),
      description: z
        .string()
        .min(4, { message: "Descrition must be greater than 4 characters!" })
    })
    .partial()
})
