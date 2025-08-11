import AccountPlan from '../Models/AccountPlansModel.js';

// Lấy tất cả các gói tài khoản
export const getAllAccountPlans = async (req, res) => {
  try {
    const plans = await AccountPlan.find({});
    if (!plans || plans.length === 0) {
      return res.status(404).json({ message: "Không có gói tài khoản nào" });
    }
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
