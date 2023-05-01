// import the Note model from ../model/Note
import { Note } from "../model/Note"

// define an interface for Note repository
interface INoteRepo {
  save(note: Note): Promise<void>
  update(note: Note): Promise<void>
  delete(noteId: number): Promise<void>
  retrieveById(noteId: number): Promise<Note>
  retrieveAll(): Promise<Note[]>
}

// implement Note repository by implementing the INoteRepo interface
export class NoteRepo implements INoteRepo {
  // implement save() method to save a new Note
  async save(note: Note): Promise<void> {
    try {
      await Note.create({
        name: note.name,
        description: note.description
      })
    } catch (error) {
      throw new Error("Failed to create note!")
    }
  }

  // implement update() method to update an existing Note
  async update(note: Note): Promise<void> {
    try {
      const new_note = await Note.findOne({
        where: {
          id: note.id
        }
      })
      if (!new_note) {
        throw new Error("Note not found!")
      }
      new_note.name = note.name
      new_note.description = note.description

      await new_note.save()
    } catch (error) {
      throw new Error("Failed to create note!")
    }
  }

  // implement delete() method to delete a Note by id
  async delete(noteId: number): Promise<void> {
    try {
      const new_note = await Note.findOne({
        where: {
          id: noteId
        }
      })
      if (!new_note) {
        throw new Error("Note not found!")
      }

      await new_note.destroy()
    } catch (error) {
      throw new Error("Failed to create note!")
    }
  }

  // implement retrieveById() method to retrieve a Note by id
  async retrieveById(noteId: number): Promise<Note> {
    try {
      const new_note = await Note.findOne({
        where: {
          id: noteId
        }
      })
      if (!new_note) {
        throw new Error("Note not found!")
      }
      return new_note
    } catch (error) {
      throw new Error("Failed to create note!")
    }
  }

  // implement retrieveAll() method to retrieve all Notes
  async retrieveAll(): Promise<Note[]> {
    try {
      return await Note.findAll()
    } catch (error) {
      throw new Error("Failed to create note!")
    }
  }
}
