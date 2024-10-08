import { Request, Response, NextFunction } from "express";
import { decodeToken } from "../configs/jwt.config";
import { decodePayload, JwtData } from "../utils/interfaces/payload.interface";
import { AuthenticationError } from "../utils/errors/AuthenticationError";

const auth = (role?: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers["authorization"];
      const bearer = "Bearer ";

      console.log(authHeader);

      if (!authHeader || !authHeader.startsWith(bearer)) {
        throw new AuthenticationError();
      }

      const token = authHeader.replace(bearer, "");

      // const authorized = blackList.map_token(token);
      // if (!authorized) {
      //   throw new Error("Black list");
      // }

      const data = decodeToken(token) as JwtData;
      const payload = data.payload as decodePayload;

      // return res.json(data)
      // check if the current user is the owner user
      // const ownerAuthorized = req.params.id == user.user_id; //cant update self
      // if the current user is not the owner and
      // if the user role don't have the permission to do this action.
      // the user will get this error
      if (role) {
        if (!role.includes(payload.role)) {
          throw new Error("Unauthorized!");
        }
      }
      req.currentUser = payload;
      // if the user has permissions
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
