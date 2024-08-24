import Todo from "../models/Todo.js";
import { jsonGenerate } from "../utils/helpers.js";
import { StatusCode } from "../utils/constants.js";

export const getIncompleteTodos = async (req, res) => {
  try {
    const list = await Todo.find({ userId: req.userId, isCompleted: "false" });

    return res.json(
      jsonGenerate(StatusCode.SUCCESS, "Incomplete Todo list: ", list)
    );
  } catch (e) {
    return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "ERROR", e));
  }
};
