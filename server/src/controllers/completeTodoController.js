import Todo from "../models/Todo.js";
import { jsonGenerate } from "../utils/helpers.js";
import { StatusCode } from "../utils/constants.js";

export const getCompleteTodos = async (req, res) => {
  try {
    const list = await Todo.find({ userId: req.userId, isCompleted: "true" });

    return res.json(
      jsonGenerate(StatusCode.SUCCESS, "Complete Todo list: ", list)
    );
  } catch (e) {
    return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "ERROR", e));
  }
};
