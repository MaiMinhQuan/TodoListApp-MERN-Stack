import { validationResult } from "express-validator";
import { StatusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helpers.js";
import Todo from "../models/Todo.js";

export const markTodo = async (req, res) => {
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
    const todo = await Todo.findOneAndUpdate(
      {
        _id: req.body.todo_id,
      },
      [
        {
          $set: {
            isCompleted: {
              $eq: [false, "$isCompleted"],
            },
          },
        },
      ]
    );

    if (todo) {
      return res.json(jsonGenerate(StatusCode.SUCCESS, "Updated", todo));
    }
  } catch (e) {
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Could not update", null)
    );
  }
};
