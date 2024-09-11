import { CustomError } from "./CustomError";

export class AuthenticationError extends CustomError {
  StatusCode = 401;
  constructor() {
    super("user unauthenticated");
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
  serialize(): { message: string } {
    return { message: "user unauthenticated" };
  }
}
