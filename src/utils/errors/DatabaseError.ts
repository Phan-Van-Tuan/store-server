import { CustomError } from "./CustomError";

export class DatabaseError extends CustomError {
  StatusCode = 500;
  constructor() {
    super("Database crashed. Try a later.");
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
  serialize(): { message: string } {
    return { message: "Database crashed. Try a later." };
  }
}
