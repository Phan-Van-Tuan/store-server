export abstract class CustomError extends Error {
  constructor(public messager: string) {
    super(messager);
  }
  abstract StatusCode: number;
  abstract serialize(): { messager: string };
}
