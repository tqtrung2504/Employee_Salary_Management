// controllers/departmentController.js
import Department from "../models/Department.js";

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json({ success: true, departments });
  } catch (error) {
    return res.status(500).json({ success: false, error: "get department server error" });
  }
};

const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;
    if (!dep_name?.trim()) {
      return res
        .status(400)
        .json({ success: false, error: "dep_name is required" });
    }

    const newDep = await Department.create({ dep_name, description });
    return res.status(201).json({ success: true, department: newDep });
  } catch (error) {
    console.error("addDepartment error:", error);
    return res
      .status(500)
      .json({ success: false, error: "add department server error" });
  }
};

const getDepartment = async (req, res) => {
  try{
    const {id} = req.params;
    const department = await Department.findById({_id: id})
    return res.status(200).json({ success: true, department });
  } catch (error) {
    return res.status(500).json({ success: false, error: "get department server error" });
  }
}

const updateDepartment = async (req, res) =>{
  try{
    const {id} = req.params
    const {dep_name, description} = req.body
    const updateDep = await Department.findByIdAndUpdate({_id: id}, {
      dep_name,
      description
    })
    return res.status(200).json({ success: true, updateDep });
  } catch (error) {
    return res.status(500).json({ success: false, error: "edit department server error" });
  }
}

const deleteDepartment = async(req, res) =>{
  try{
    const {id} = req.params
    const deleteDep = await Department.findByIdAndDelete({_id: id})
    return res.status(200).json({ success: true, deleteDep });
  } catch (error) {
    return res.status(500).json({ success: false, error: "delete department server error" });
  }
}

export { getDepartments, addDepartment,  getDepartment, updateDepartment, deleteDepartment};
