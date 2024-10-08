import { JWT_TOKEN_SECRET, StatusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helpers.js";
import Jwt from "jsonwebtoken";

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */

const AuthMiddleware = (req, res, next) => {
  if (req.headers["auth"] === undefined) {
    return res.json(jsonGenerate(StatusCode.AUTH_ERROR, "Access denied"));
  }

  const token = req.headers["auth"];

  try {
    const decoded = Jwt.verify(token, JWT_TOKEN_SECRET);
    console.log("decoded", decoded);
    req.userId = decoded.userId;
    return next();
  } catch (e) {
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Invalid token")
    );
  }
};

export default AuthMiddleware;
