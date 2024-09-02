export interface JwtData {
  payload: object;
  iat: number;
  exp: number;
}

export interface signupPayload {
  userName: string;
  email: string;
  password: string;
  otp: number;
}
