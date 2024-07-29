import express from "express";
import Register from "../controllers/registerController.js";
import Login from "../controllers/loginController.js";
import { RegisterSchema } from "../validationScheme/registerSchema.js";
import { LoginSchema } from "../validationScheme/loginSchema.js";
import { createTodo } from "../controllers/todoController.js";
import { check } from "express-validator";
import { getTodos } from "../controllers/todoListController.js";
import { markTodo } from "../controllers/markTodoController.js";
import { removeTodo } from "../controllers/removeTodoController.js";

const apiRoute = express.Router();
export const apiProtected = express.Router();

apiRoute.post("/register", RegisterSchema, Register);
apiRoute.post("/login", LoginSchema, Login);

//protected routes

apiProtected.post(
  "/createTodo",
  [check("desc", "Todo description is required").exists()],
  createTodo
);

apiProtected.post(
  "/markTodo",
  [check("todo_id", "Todo id is required").exists()],
  markTodo
);

apiProtected.post(
  "/deleteTodo",
  [check("todo_id", "Todo id is required").exists()],
  removeTodo
);

apiProtected.get("/todoList", getTodos);

export default apiRoute;
