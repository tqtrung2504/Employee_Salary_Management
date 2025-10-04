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

const getLeave = async (req, res) => {
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

const getLeaves = async (req, res) => {
    try{
        const leaves = await Leave.find().populate({
            path: "employeeId",
            populate: [
                {
                    path: 'department',
                    select: 'dep_name'
                },
                {
                    path: 'userId',
                    select: 'name'
                },

            ]
        })
        return res.status(200).json({ success: true, leaves});
    }catch (error) {
        return res.status(500).json({ success: false, error: "leave list server error" });
    }
}

const getLeaveDetail = async (req, res) =>{
    try{
        const { id } = req.params;
        const leave = await Leave.findById(id).populate({
            path: "employeeId",
            populate: [
                {
                    path: 'department',
                    select: 'dep_name'
                },
                {
                    path: 'userId',
                    select: 'name profileImage'
                },

            ]
        })
        return res.status(200).json({ success: true, leave});
    }catch(error){
        return res.status(500).json({ success: false, error: "leave list server error" })
    }
}

const updateLeave = async (req, res) => {
    try{
        const { id } = req.params;
        const { status } = req.body;
        if(!status || !["Pending", "Approved", "Rejected"].includes(status)){
            return res.status(400).json({ success: false, error: "Invalid status" });
        }
        const leave = await Leave.findByIdAndUpdate(
            id,
            { status, updatedAt: new Date() },
            { new: true }
        );
        if(!leave){
            return res.status(404).json({ success: false, error: "Leave not found" });
        }
        return res.status(200).json({ success: true, leave });
    }catch(error){
        return res.status(500).json({ success: false, error: "leave update server error" })
    }
}



export {addLeave, getLeave, getLeaves, getLeaveDetail, updateLeave}