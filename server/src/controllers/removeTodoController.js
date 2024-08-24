import { validationResult } from "express-validator";
import { StatusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helpers.js";
import Todo from "../models/Todo.js";
import User from "../models/User.js";

export const removeTodo = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.json(
      jsonGenerate(
        StatusCode.VALIDATION_ERROR,
        "Todo id is required",
        error.mapped()
      )
    );
  }

  try {
    const result = await Todo.findOneAndDelete({
      _id: req.body.todo_id,
    });

    console.log("Check result when deleting: ", result);

    if (result) {
      const user = await User.findOneAndUpdate(
        {
          _id: req.userId,
        },
        {
          $pull: { todos: req.body.todo_id },
        }
      );

      return res.json(jsonGenerate(StatusCode.SUCCESS, "Todo deleted", null));
    }
  } catch (e) {
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Could not delete", null)
    );
  }
};
