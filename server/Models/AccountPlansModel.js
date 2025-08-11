import mongoose from "mongoose";

//Schema gói tài khoản
const accountPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  quality: { type: String, required: true },
  resolution: { type: String, required: true },
  devices: { type: String, required: true },
  maxDevices: { type: Number, required: true },
  downloads: { type: Number, required: true },
});

// Tạo model từ schema
const AccountPlan = mongoose.model('AccountPlan', accountPlanSchema);

export default AccountPlan;
