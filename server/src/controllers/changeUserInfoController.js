import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import { StatusCode } from "../utils/constants.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const changeUserInfo = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { userId, name, password, email } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // const userExist = await User.findOne({
    //   email: email,
    // });

    // if (userExist) {
    //   return res.json(
    //     jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Email already exists")
    //   );
    // }

    //save to DB
    try {
      const result = await User.updateOne(
        { _id: userId },
        {
          name: name,
          email: email,
          password: hashPassword,
        }
      );

      console.log("CHeck result after update: ", result);

      res.json(
        jsonGenerate(StatusCode.SUCCESS, "Change info successful", {
          name: name,
          email: email,
          password: password,
        })
      );
    } catch (e) {
      console.log(e);
    }
  }
  res.json(
    jsonGenerate(
      StatusCode.VALIDATION_ERROR,
      "Validation error",
      errors.mapped()
    )
  );
};

export default changeUserInfo;
