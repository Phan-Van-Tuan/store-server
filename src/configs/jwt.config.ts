import jwt from "jsonwebtoken";
import { config } from "./variable.config";

const generateToken = (data: object, expire: string) => {
  return jwt.sign(
    {
      payload: data,
    },
    config.secretKey,
    { expiresIn: expire }
  );
};

const decodeToken = (token: string) => {
  return jwt.verify(token, config.secretKey);
};

export { generateToken, decodeToken };
