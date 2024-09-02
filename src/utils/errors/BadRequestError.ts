import { CustomError } from "./CustomError";

export class BadRequestError extends CustomError {
  StatusCode = 400;
  constructor(public messager: string) {
    super(messager);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
  serialize(): { messager: string } {
    return { messager: this.messager };
  }
}
