// Importing necessary modules
import { Sequelize } from "sequelize-typescript" //instead of writing raw sql
import * as dotenv from "dotenv"
import { Note } from "../model/Note"

// Loading environment variables from .env file
dotenv.config()

// Creating a Database class
class Database {
  // sequelize property of the class is initially undefined
  public sequelize: Sequelize | undefined

  // Environment variables required to connect to PostgreSQL
  private POSTGRES_DB = process.env.POSTGRES_DB as string
  private POSTGRES_HOST = process.env.POSTGRES_HOST as string
  private POSTGRES_PORT = process.env.POSTGRES_PORT as unknown as number
  private POSTGRES_USER = process.env.POSTGRES_USER as unknown as string
  private POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as unknown as string

  // Constructor method
  constructor() {
    this.connectToPostgreSQL() // Connect to PostgreSQL database on initialization
  }

  // Method to connect to PostgreSQL database
  private async connectToPostgreSQL() {
    // Create a new Sequelize instance with the required options
    this.sequelize = new Sequelize({
      database: this.POSTGRES_DB, // Database name
      username: this.POSTGRES_USER, // Username to connect to the database
      password: this.POSTGRES_PASSWORD, // Password to connect to the database
      host: this.POSTGRES_HOST, // Hostname of the database server
      port: this.POSTGRES_PORT, // Port number of the database server
      dialect: "postgres", // Database dialect to use
      models: [Note] // Array of model definitions to load
    })

    // Authenticate with the database and log the status
    await this.sequelize
      .authenticate()
      .then(() => {
        console.log(
          "✅ PostgreSQL Connection has been established successfully."
        )
      })
      .catch((err) => {
        console.error("❌ Unable to connect to the PostgreSQL database:", err)
      })
  }
}

export default Database // Export the Database class as the default export of this module
