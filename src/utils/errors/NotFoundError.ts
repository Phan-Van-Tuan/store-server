import { CustomError } from "./CustomError";

export class NotFoundError extends CustomError {
  StatusCode = 404;
  constructor() {
    super("Not Found.");
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  serialize(): { message: string } {
    return { message: "Not Found." };
  }
}
