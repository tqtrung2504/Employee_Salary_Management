import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import connectToDatabase from './db/db.js';
import departmentRouter from './routes/department.js';
import employeeRouter from './routes/employee.js';
import salaryRouter from './routes/salary.js';


connectToDatabase();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public/uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/salary', salaryRouter)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
