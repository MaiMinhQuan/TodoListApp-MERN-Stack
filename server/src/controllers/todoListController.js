import User from "../models/User.js";
import { jsonGenerate } from "../utils/helpers.js";
import { StatusCode } from "../utils/constants.js";

export const getTodos = async (req, res) => {
  try {
    const list = await User.findById(req.userId)
      .select("-password")
      .populate("todos")
      .exec();
    console.log("check req when getTodos: ", req);
    return res.json(jsonGenerate(StatusCode.SUCCESS, "Todo list: ", list));
  } catch (e) {
    return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "ERROR", e));
  }
};
