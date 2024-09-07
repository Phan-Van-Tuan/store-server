import { decodePayload } from "./utils/interfaces/payload.interface";

declare global {
  namespace Express {
    interface Request {
      currentUser?: decodePayload; // Hoặc kiểu của bạn
    }
  }
}
