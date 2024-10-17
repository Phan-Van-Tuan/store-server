import mongoose, { Schema, Document } from "mongoose";

// Interface cho voucher
interface IVoucher extends Document {
  code: string;
  type: "discount" | "freeship"; // Loại voucher: freeship hoặc giảm giá
  discountAmount?: number; // Số tiền giảm giá
  minOrderValue?: number; // Giá trị đơn hàng tối thiểu để áp dụng voucher
  freeShippingMax?: number; // Giá trị freeship tối đa (nếu có)
  expirationDate: Date; // Ngày hết hạn
  isActive: boolean; // Trạng thái còn hiệu lực
  usageLimit?: number; // Số lần sử dụng tối đa
  usageCount: number; // Số lần đã sử dụng
  applicableProducts?: mongoose.Types.ObjectId[];
}

// Schema cho voucher
const voucherSchema: Schema = new mongoose.Schema<IVoucher>(
  {
    code: { type: String, required: true, unique: true },
    type: {
      type: String,
      enum: ["discount", "freeship"],
      required: true,
    },
    discountAmount: { type: Number }, // Chỉ áp dụng cho loại giảm giá
    minOrderValue: { type: Number }, // Giá trị đơn tối thiểu để áp dụng
    freeShippingMax: { type: Number }, // Giá trị freeship tối đa (chỉ với freeship)
    expirationDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true }, // Voucher có còn hiệu lực không
    usageLimit: { type: Number }, // Số lần sử dụng tối đa
    usageCount: { type: Number, default: 0 }, // Số lần đã sử dụng
    applicableProducts: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    ], // Áp dụng cho những sản phẩm cụ thể
  },
  { timestamps: true }
);

// Tạo model Voucher
const Voucher = mongoose.model<IVoucher>("Voucher", voucherSchema);

export default Voucher;
