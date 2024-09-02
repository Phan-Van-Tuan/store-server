import crypto from "crypto";

// Tạo khóa và thuật toán mã hóa
const algorithm = "aes-256-ctr";
const secretKey = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

// Hàm mã hóa
const encrypt = (text: string) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
};

// Hàm giải mã
const decrypt = (hash: string) => {
  const [iv, content] = hash.split(":");
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(iv, "hex")
  );
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(content, "hex")),
    decipher.final(),
  ]);

  return decrypted.toString();
};

export { encrypt, decrypt };
