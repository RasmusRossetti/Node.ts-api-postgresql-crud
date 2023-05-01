import express, { Application, Request, Response } from "express"
import Database from "./config/database"
import NoteRouter from "./router/NoteRouter"

class App {
  public app: Application

  constructor() {
    // initialize express app
    this.app = express()
    // synchronize database
    this.databaseSync()
    // add plugins/middleware
    this.plugins()
    // define routes
    this.routes()
  }

  // add plugins/middleware
  protected plugins(): void {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  // synchronize database
  protected databaseSync(): void {
    const db = new Database()
    db.sequelize?.sync()
  }

  // define routes
  protected routes(): void {
    // default route
    this.app.route("/").get((req: Request, res: Response) => {
      res.send("welcome home")
    })
    // note router
    this.app.use("/api/v1/note", NoteRouter)
  }
}

const port: number = 8000
const app = new App().app

// start server
app.listen(port, () => {
  console.log("✅ Server started successfully!")
})
