import nodemailer from "nodemailer";
import User from "../models/user.model";
import { BadRequestError } from "../utils/errors/BadRequestError";
import { decodeToken, generateToken } from "../configs/jwt.config";
import { JwtData, signupPayload } from "../utils/interfaces/payload.interface";
import { config } from "../configs/variable.config";
import html from "../utils/mail.util";
import {
  regexEmail,
  regexPassword,
  regexUsername,
} from "../utils/validate.util";

function generateOTP(): number {
  return Math.floor(100000 + Math.random() * 900000);
}

async function sendEmail(email: string, otp: number) {
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
  const info = await transporter.sendMail({
    from: '"Fitfo" <admin>', // sender address
    to: email, // list of receivers
    subject: "Authenticate Registration", // Subject line
    text: "Hello world?", // plain text body
    html: html(otp), // html body
  });
  return info;
}

// --------------------------- AUTH ----------------------------------
export async function register(
  userName: string,
  email: string,
  password: string
) {
  if (!userName || !email || !password) {
    throw new BadRequestError("All fields are required");
  }

  if (regexUsername.test(userName)) {
    throw new BadRequestError(
      "Username is not valid: Usernames contain only alphabetic characters (a-z, A-Z), numbers (0-9), underscores (_), periods (.), and hyphens (-). Usernames do not contain spaces and do not begin with special characters."
    );
  }

  if (regexPassword.test(password)) {
    throw new BadRequestError(
      "Password is not valid :Password at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number."
    );
  }

  if (regexEmail.test(email)) {
    throw new BadRequestError("Email is not valid");
  }

  const existEmail = await User.find({ email: email });
  if (existEmail.length) {
    throw new BadRequestError("Email already exists");
  }

  const otp: number = generateOTP();
  await sendEmail(email, otp);
  const data = {
    userName,
    email,
    password,
    otp,
  };

  const token: string = generateToken(data, "5m");
  return token;
}

export async function verifyOTP(token: string, otp: number) {
  const data = decodeToken(token) as JwtData;
  const payload = data.payload as signupPayload;
  if (payload.otp != otp) {
    throw new BadRequestError("OTP is wrong");
  }
  return payload;
}
