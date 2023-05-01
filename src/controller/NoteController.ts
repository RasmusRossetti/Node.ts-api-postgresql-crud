import { Request, Response } from "express"
import { Note } from "../model/Note" // Importing Note model
import { NoteRepo } from "../repository/NoteRepo" // Importing Note repository

class NoteController {
  async create(req: Request, res: Response) {
    try {
      // Creating a new instance of Note model
      const new_note = new Note()

      // Assigning name and description from request body to the new Note instance
      new_note.name = req.body.name
      new_note.description = req.body.description

      // Saving the new Note instance using NoteRepo's save method
      await new NoteRepo().save(new_note)

      // Returning success response with status 201 and a message
      res.status(201).json({
        status: "Created!",
        message: "Successfully created note!"
      })
    } catch (err) {
      // Returning error response with status 500 and an error message
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!"
      })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      // Parsing note ID from request parameters
      let id = parseInt(req.params["id"])

      // Deleting note with the given ID using NoteRepo's delete method
      await new NoteRepo().delete(id)

      // Returning success response with status 200 and a message
      res.status(200).json({
        status: "Ok!",
        message: "Successfully deleted note!"
      })
    } catch (err) {
      // Returning error response with status 500 and an error message
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!"
      })
    }
  }

  async findById(req: Request, res: Response) {
    try {
      // Parsing note ID from request parameters
      let id = parseInt(req.params["id"])

      // Retrieving note with the given ID using NoteRepo's retrieveById method
      const new_note = await new NoteRepo().retrieveById(id)

      // Returning success response with status 200, a message, and the retrieved note data
      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched note by id!",
        data: new_note
      })
    } catch (err) {
      // Returning error response with status 500 and an error message
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!"
      })
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      // Retrieving all notes using NoteRepo's retrieveAll method
      const new_note = await new NoteRepo().retrieveAll()

      // Returning success response with status 200, a message, and all the retrieved notes data
      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched all note data!",
        data: new_note
      })
    } catch (err) {
      // Returning error response with status 500 and an error message
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!"
      })
    }
  }

  async update(req: Request, res: Response) {
    try {
      // Parsing note ID from request parameters
      let id = parseInt(req.params["id"])

      // Creating a new instance of Note model with the updated name and description
      const new_note = new Note()

      new_note.id = id
      new_note.name = req.body.name
      new_note.description = req.body.description

      await new NoteRepo().update(new_note)

      res.status(200).json({
        status: "Ok!",
        message: "Successfully updated note data!"
      })
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!"
      })
    }
  }
}

export default new NoteController()
