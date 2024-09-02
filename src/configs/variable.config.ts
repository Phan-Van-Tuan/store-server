import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Export the environment variables as a configuration object
export const config = {
  // http
  version: "v1",
  port: process.env.PORT || 3003,

  //db
  dbHost: process.env.DB_HOST || "localhost",
  dbUser: process.env.DB_USER || "myuser",
  dbPass: process.env.DB_PASS || "mypassword",

  // jwt
  secretKey: process.env.JWT_SECRET_KEY || "mysecretkey",

  // send email
  myEmail: process.env.EMAIL_USERNAME,
  myAppPassword: process.env.EMAIL_PASSWORD,

  // vnpay
  vnp_TmnCode: process.env.VNP_TMNCODE || "",
  vnp_HashSecret: process.env.VNP_HASHSECRET || "",
  vnp_Url: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
  vnp_Api: "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction",
  vnp_ReturnUrl: `http://localhost:${
    process.env.PORT || 3003
  }/api/v1/payment/vnpay_return`,
};
