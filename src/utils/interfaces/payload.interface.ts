export interface JwtData {
  payload: object;
  iat: number;
  exp: number;
}

export interface verifyOTP {
  email: string;
  otp: number;
}

export interface decodePayload {
  userId: string;
  role: string;
  isVerify: boolean;
}
