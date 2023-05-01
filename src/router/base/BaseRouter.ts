// Importing the Router class and IRouter interface from express and ./RouterInterface file respectively.
import { Router } from "express"
import IRouter from "./RouterInterface"

// Creating an abstract class named BaseRoutes that implements the IRouter interface.
//An abstract class is a class that cannot be instantiated directly, and serves as a blueprint for other classes to inherit from. It can contain abstract methods, which are methods without a body that must be implemented by any child classes that inherit from the abstract class.
abstract class BaseRoutes implements IRouter {
  // Declaring the router property of type Router.
  public router: Router
  // Constructor method that initializes the router property by calling the Router() constructor
  // and the routes() abstract method.
  constructor() {
    this.router = Router()
    this.routes()
  }
  // An abstract method named routes which must be implemented in the child classes.
  abstract routes(): void
}

// Exporting the BaseRoutes class as the default export of the module.
export default BaseRoutes
