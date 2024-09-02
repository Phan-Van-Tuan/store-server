import { CustomError } from "./CustomError";

export class DatabaseError extends CustomError {
  StatusCode = 500;
  constructor() {
    super("Database crashed. Try a later.");
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
  serialize(): { messager: string } {
    return { messager: "Database crashed. Try a later." };
  }
}
