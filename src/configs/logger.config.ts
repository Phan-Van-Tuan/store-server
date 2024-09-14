import { createLogger, format, transports } from "winston";
const { combine, timestamp, printf, colorize } = format;

// Tạo cấu trúc định dạng log
const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Cấu hình logger
const logger = createLogger({
  format: combine(
    colorize(), // Thêm màu sắc vào log cho dễ đọc
    timestamp(), // Thêm timestamp vào log
    customFormat
  ),
  transports: [
    // new transports.File({ filename: "logs/error.log", level: "error" }), // Lưu log lỗi vào file
    // new transports.File({ filename: "logs/combined.log" }), // Lưu tất cả log vào file
  ],
  exceptionHandlers: [
    // new transports.File({ filename: "logs/exceptions.log" }), // Lưu các log của ngoại lệ
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.simple(),
    })
  );
}

export default logger;
