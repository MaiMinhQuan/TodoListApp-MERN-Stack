import { StatusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helpers.js";
import { validationResult } from "express-validator";
import Todo from "../models/Todo.js";

export const editTodo = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json(
      jsonGenerate(
        StatusCode.VALIDATION_ERROR,
        "Todo is required",
        error.mapped()
      )
    );
  }

  try {
    const result = await Todo.updateOne(
      {
        _id: req.body.todo_id,
      },
      {
        title: req.body.title,
        desc: req.body.desc,
      }
    );

    if (result) {
      return res.json(
        jsonGenerate(StatusCode.SUCCESS, "Todo updated successfully", result)
      );
    }
  } catch (e) {
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Something went wrong", e)
    );
  }
};
