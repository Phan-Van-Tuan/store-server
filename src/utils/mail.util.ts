interface EmailOptions {
  otpCode: number;
  subject: string;
  message: string;
  closing: string;
  logoUrl?: string;
  companyAddress?: string;
}

const generateEmail = ({
  otpCode,
  subject,
  message,
  closing,
  logoUrl = "https://firebasestorage.googleapis.com/v0/b/fitfo-storage.appspot.com/o/avatars%2Flogo_default.png?alt=media&token=7d6ef2a3-383d-430d-a94c-89e272ae1dea",
  companyAddress = "Fitfo Inc, 114 Chien Thang st, Tan Trieu, Thanh Tri, Ha Noi"
}: EmailOptions) =>
  `
<div style="font-family: Helvetica,Arial,sans-serif;min-width:100px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee;margin: 0 auto;width: max-content">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">
        <img src="${logoUrl}" style="height:100px; width:100px;"/>
      </a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>${message}</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otpCode}</h2>
    <p style="font-size:0.9em;">Regards,<br />${closing}</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>${companyAddress}</p>
    </div>
  </div>
</div>
`;

export default generateEmail;
