import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import _User from "../models/user.model";
import _Token from "../models/token.model";
import generateEmail from "../utils/mail.util";
import { config } from "../configs/variable.config";
import { BadRequestError } from "../utils/errors/BadRequestError";
import { decodeToken, generateToken } from "../configs/jwt.config";
import { JwtData, verifyOTP } from "../utils/interfaces/payload.interface";
import {
  regexEmail,
  regexPassword,
  regexUsername,
} from "../utils/validate.util";
import { AuthenticationError } from "../utils/errors/AuthenticationError";
import { emit } from "process";

// -------------- CHILD FUNCTION ----------------
async function sendEmail(
  emailAddress: string,
  otp: number,
  subject: string,
  message: string,
  closing: string
) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: config.myEmail,
      pass: config.myAppPassword,
    },
  });

  const email = generateEmail({
    otpCode: otp,
    subject: subject,
    message: message,
    closing: closing,
  });

  const info = await transporter.sendMail({
    from: '"JPatrick" <admin>', // sender address
    to: emailAddress, // list of receivers
    subject: subject, // Subject line
    text: message, // plain text body
    html: email, // html body
  });
  return info;
}

async function validateSignup(
  userName: string,
  email: string,
  password: string
) {
  if (!userName || !email || !password) {
    throw new BadRequestError("All fields are required");
  }

  if (!regexUsername.test(userName)) {
    throw new BadRequestError(
      "Username is not valid: Usernames contain only alphabetic characters (a-z, A-Z), numbers (0-9), underscores (_), periods (.), and hyphens (-). Usernames do not contain spaces and do not begin with special characters."
    );
  }

  if (!regexPassword.test(password)) {
    throw new BadRequestError(
      "Password is not valid :Password at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number."
    );
  }

  if (!regexEmail.test(email)) {
    throw new BadRequestError("Email is not valid");
  }

  const existEmail = await _User.find({ email });
  if (existEmail.length) {
    throw new BadRequestError("Email already exists");
  }
}

// ------------------------ MAIN FUNCTION ----------------------------
// --------------------------- AUTH ----------------------------------
export async function register(
  userName: string,
  email: string,
  password: string
) {
  try {
    await validateSignup(userName, email, password);

    const hashPassword = await bcrypt.hash(password, config.salt);
    const newUser = new _User({
      username: userName,
      email: email,
      password: hashPassword,
    });

    newUser.save();
    return newUser;
  } catch (e) {
    throw e;
  }
}

export async function sendOTP(subject: string, email: string) {
  const otp = Math.floor(100000 + Math.random() * 900000);
  await sendEmail(
    email,
    otp,
    subject,
    "Use the following OTP to complete your work procedures. OTP is valid for 5 minutes.",
    "Admin"
  );

  const data = {
    email,
    otp,
  };

  const token: string = generateToken(data, "5m");
  return token;
}

export async function verifyOTP(token: string, otp: number) {
  const data = decodeToken(token) as JwtData;
  const payload = data.payload as verifyOTP;
  if (payload.otp != otp) {
    throw new BadRequestError("OTP is wrong");
  }

  const user = await _User.findOne({ email: payload.email });
  if (user) {
    user.isVerify = true;
    await user.save();
    return user;
  }

  throw new Error("User not found");
}

export async function login(email: string, password: string) {
  const user = await _User.findOne({ email });
  if (!user) {
    throw new BadRequestError("Email is not already");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new BadRequestError("Password is wrong");
  }

  const data = { userId: user._id, role: user.role };

  const accessToken = generateToken(data, "24h");

  const refreshToken = generateToken(data, "30 days");

  const token = new _Token({ userId: user._id, token: refreshToken });
  token.save();

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
}

export async function refresh(refreshToken: string) {
  const tokenRecord = await _Token.findOne({ token: refreshToken });
  if (!tokenRecord) {
    throw new AuthenticationError();
  }

  const data = decodeToken(refreshToken) as object;

  const accessToken = generateToken(data, "24h");

  const newRefreshToken = generateToken(data, "30 days");

  tokenRecord.token = newRefreshToken;
  tokenRecord.save();

  return {
    accessToken: accessToken,
    refreshToken: newRefreshToken,
  };
}

export async function logout(authHeader: string, refreshToken: string) {
  const tokenRecord = await _Token.findOneAndDelete({ token: refreshToken });
  if (!tokenRecord) {
    throw new BadRequestError("Token is not valid");
  }
  if (!authHeader) {
    throw new AuthenticationError();
  }
  const bearer = "Bearer ";
  const accessToken = authHeader.replace(bearer, "");
  // await BlackList.push_token(accessToken, "logout");

  return "Log out successfully";
}

export async function changePassword(
  currentUser: string,
  currentPassword: string,
  newPassword: string
) {
  const user = await _User.findById({ userId: currentUser });
  if (!user) {
    throw new AuthenticationError();
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw new BadRequestError("Password in not correct!");
  }

  const password = await bcrypt.hash(newPassword, config.salt);
  user.password = password;
  user.save();

  return "Changed password successfully";
}

// export async function resetPassword(body) {
//   this.verifyOTP(body);

//   const email = body.email.toLowerCase();

//   const user = await User.findOne({ email });
//   if (!user) {
//     throw new E(400, "Email is not already");
//   }

//   const password = await bcrypt.hash(body.password, 5);
//   user.password = password;
//   user.save();

//   return "Reset password successfully";
// }

// export async function forgotPassword(body) {
//   this.verifyOTP(body);

//   const email = body.email.toLowerCase();
//   const user = await User.findOne({ email });
//   if (!user) {
//     throw new E(400, "Email is not already");
//   }

//   const data = { userId: user._id, role: user.role };

//   const accessToken = jwt.sign(
//     data,
//     process.env.TOKEN_SECRET,
//     { expiresIn: 60 * 10 } // 10 minutes
//   );

//   const refreshToken = jwt.sign(
//     data,
//     process.env.TOKEN_SECRET,
//     { expiresIn: 60 * 60 * 24 * 30 } // 30 days
//   );

//   const token = new Token({ userId: user._id, token: refreshToken });
//   token.save();

//   return {
//     accessToken: accessToken,
//     refreshToken: refreshToken,
//   };
// }
