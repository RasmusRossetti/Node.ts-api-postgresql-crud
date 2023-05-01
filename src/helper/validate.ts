// Import the necessary modules
import { NextFunction, Request, Response } from "express"
import { AnyZodObject } from "zod"

// Define a middleware function that will validate the request
const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Use the Zod schema to validate the request body, query parameters, and route parameters
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      })

      // If the validation passes, call the next middleware function
      return next()
    } catch (err: any) {
      // If the validation fails, return a 400 Bad Request error with the error message from the Zod validation
      const error_message = JSON.parse(err.message)
      return res.status(400).json({
        status: "Bad Request!",
        message: error_message[0].message
      })
    }
  }

// Export the middleware function
export default validate
