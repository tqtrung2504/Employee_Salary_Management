import Employee from '../models/Employee.js'
import Leave from '../models/Leave.js'

const addLeave = async (req, res) => {
    try{
        const { leaveType, startDate, endDate, reason } = req.body;
        if(!leaveType || !startDate || !endDate || !reason){
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }
        const employee = await Employee.findOne({ userId: req.user._id });
        if(!employee){
            return res.status(404).json({ success: false, error: "Employee record not found for user" });
        }
        const newLeave = new Leave({
            employeeId: employee._id,
            leaveType,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            reason,
        })
        await newLeave.save()
        return res.status(200).json({ success: true});
    } catch (error) {
        return res.status(500).json({ success: false, error: "leave add server error" });
    }
}

const getLeaves = async (req, res) => {
    try{
        const { id } = req.params;
        const employee = await Employee.findOne({ userId: id });
        if(!employee){
            return res.status(200).json({ success: true, leaves: [] });
        }
        const leaves = await Leave.find({ employeeId: employee._id });
        return res.status(200).json({ success: true, leaves});
    }catch (error) {
        return res.status(500).json({ success: false, error: "leave list server error" });
    }
}

export {addLeave, getLeaves}