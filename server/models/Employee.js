import mongoose from "mongoose";
import { Schema } from "mongoose";

const employeeSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: "User", require: true},
    employeeId: {type: String, require: true, unique: true},
    dob: {type: Date},
    gender: {type: String},
    martialStatus: {type: String},
    designation: {type: String},
    department: {type: Schema.Types.ObjectId, ref: "Department", require: true},
    salary: {type: Number, require: true},
    createdAt: {type: Date, default: Date.now},
    updatedAT: {type: Date, default: Date.now},
})

const Employee = mongoose.model("Employee", employeeSchema)
export default Employee;