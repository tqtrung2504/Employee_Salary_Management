import mongoose from "mongoose";
import Salary from "../models/Salary.js";
import Employee from '../models/Employee.js'


const addSalary = async (req, res) => {
  try {
    const { employeeId, basicSalary, allowances, deductions, payDate } = req.body;
    if (!employeeId) {
      return res.status(400).json({ success: false, error: "employeeId is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
      return res.status(400).json({ success: false, error: "employeeId is invalid" });
    }
    const basic = Number(basicSalary);
    const allow = Number(allowances);
    const deduct = Number(deductions);

    if ([basic, allow, deduct].some((v) => Number.isNaN(v))) {
      return res.status(400).json({ success: false, error: "Salary fields must be numbers" });
    }
    if (basic < 0 || allow < 0 || deduct < 0) {
      return res.status(400).json({ success: false, error: "Salary fields must be >= 0" });
    }
    const payAt = payDate ? new Date(payDate) : null;
    if (!payAt || isNaN(payAt.getTime())) {
      return res.status(400).json({ success: false, error: "payDate is invalid" });
    }
    const netSalary = basic + allow - deduct;
    const newSalary = new Salary({
      employeeId,
      basicSalary: basic,
      allowances: allow,
      deductions: deduct,
      netSalary,
      payDate: payAt,
    });

    await newSalary.save();

    return res.status(201).json({
      success: true,
      salary: newSalary,
      message: "Salary created",
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: "salary add server error" });
  }
};

const getSalary = async (req, res) => {
    try{
        const {id} = req.params;
        let salary = await Salary.find({employeeId: id}).populate('employeeId', 'employeeId')
        if(!salary || salary.length < 1){
          const employee = await Employee.findOne({userId: id})
          salary = await Salary.find({employeeId: employee._id}).populate('employeeId', 'employeeId')
        }
        return res.status(200).json({success: true, salary})
    } catch (error) {
    console.error("addSalary error:", error);
    return res.status(500).json({ success: false, error: "salary get server error" });
  }
}

export { addSalary, getSalary };
