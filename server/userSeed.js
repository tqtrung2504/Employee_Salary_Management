import User from './models/User.js';
import bcrypt from 'bcryptjs';
import connectToDatabase from './db/db.js';

const userRegister = async () => {
    connectToDatabase();
  try {
    const hashPassword = await bcrypt.hash("admin", 10);
    const newUser = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashPassword,
      role: "admin",
    });

    await newUser.save();
    console.log("✅ User Admin đã được tạo thành công");
  } catch (error) {
    console.log("❌ Lỗi khi tạo user:", error);
  }
};

userRegister();
