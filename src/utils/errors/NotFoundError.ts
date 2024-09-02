import { CustomError } from "./CustomError";

export class NotFoundError extends CustomError {
  StatusCode = 404;
  constructor() {
    super("Not Found.");
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  serialize(): { messager: string } {
    return { messager: "Not Found." };
  }
}
