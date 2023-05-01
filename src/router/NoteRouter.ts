// Import the BaseRoutes class from the BaseRouter module
import BaseRoutes from "./base/BaseRouter"

// Import the NoteController class from the NoteController module
import NoteController from "../controller/NoteController"

// Import the validate function from the validate module
import validate from "../helper/validate"

// Import the createNoteSchema and updateNoteSchema objects from the NoteSchema module
import { createNoteSchema, updateNoteSchema } from "../schema/NoteSchema"

// Create a class called NoteRoutes that extends the BaseRoutes class
class NoteRoutes extends BaseRoutes {
  // Implement the abstract routes method from the BaseRoutes class
  public routes(): void {
    // Define the routes for the NoteController

    // Create a new note with POST /notes
    this.router.post("", validate(createNoteSchema), NoteController.create)

    // Update an existing note with PATCH /notes/:id
    this.router.patch("/:id", validate(updateNoteSchema), NoteController.update)

    // Delete a note with DELETE /notes/:id
    this.router.delete("/:id", NoteController.delete)

    // Retrieve all notes with GET /notes
    this.router.get("", NoteController.findAll)

    // Retrieve a specific note with GET /notes/:id
    this.router.get("/:id", NoteController.findById)
  }
}

// Export an instance of the NoteRoutes class with the router property
export default new NoteRoutes().router
