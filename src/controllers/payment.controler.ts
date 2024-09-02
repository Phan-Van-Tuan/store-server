import { Request, Response, NextFunction } from "express";
import { URLSearchParams } from "url";
import crypto from "crypto";
import User from "../models/user.model.js";
// import axios from 'axios'
// import QRCode from 'qrcode'

// import Payment from "../models/payment.model";
import { VnpParams } from "../utils/interfaces/VnpParams.interface";
import { config } from "../configs/variable.config";

// export async generateQR(req, res) {
//         const { text } = req.body
//         try {
//             res.json(await QRCode.toString(text))
//         } catch (err) {
//             res.json(err)
//         }
//     }

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //   let data = await Payment.getAll();
  //   res.json(data);
};

export const createPayment = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { bankCode, amount } = req.body;
  const orderId = `${Date.now()}`;
  const vnp_Params: VnpParams = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: config.vnp_TmnCode,
    vnp_Locale: "vn",
    vnp_CurrCode: "VND",
    vnp_TxnRef: orderId,
    vnp_OrderInfo: "Thanh toan cho ma GD:" + orderId,
    vnp_OrderType: "other",
    vnp_Amount: `${parseInt(amount) * 100}`,
    vnp_ReturnUrl: config.vnp_ReturnUrl,
    vnp_IpAddr: req.ip || "",
    // vnp_BankCode: bankCode,
    vnp_CreateDate: new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, "")
      .replace(/-/g, "")
      .replace(/:/g, "")
      .replace(/ /g, ""),
  };
  const sortedParams: VnpParams = Object.keys(vnp_Params)
    .sort()
    .reduce((r: VnpParams, k: string) => {
      r[k] = vnp_Params[k];
      return r;
    }, {});

  const signData = new URLSearchParams(sortedParams).toString();
  const hmac = crypto.createHmac("sha512", config.vnp_HashSecret);
  const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
  // vnp_Params["vnp_SecureHash"] = signed;
  const paymentUrl = `${config.vnp_Url}?${new URLSearchParams(
    sortedParams
  ).toString()}&vnp_SecureHash=${signed}`;
  // return res.json(signData);

  res.json({
    status: "success",
    message: "Created payment url",
    data: paymentUrl,
  });
};

export const vnpayReturn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vnp_Params = req.query as VnpParams;
  const secureHash = vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];
  const sortedParams: VnpParams = Object.keys(vnp_Params)
    .sort()
    .reduce((r: VnpParams, k: string) => {
      r[k] = vnp_Params[k];
      return r;
    }, {});
  const signData = new URLSearchParams(sortedParams).toString();
  const hmac = crypto.createHmac("sha512", config.vnp_HashSecret);
  const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
  if (secureHash === signed) {
    // let newPayment = new Payment(
    //   vnp_Params.vnp_TxnRef,
    //   1,
    //   vnp_Params.vnp_Amount,
    //   vnp_Params.vnp_BankCode
    // );
    // await Payment.create(newPayment);
    res.json({
      status: "success",
      message: "Payment verified",
      data: vnp_Params,
    });
  } else {
    res.json({
      status: "failure",
      message: "Invalid signature",
      data: vnp_Params,
    });
  }
};
