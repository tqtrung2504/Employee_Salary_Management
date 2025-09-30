import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const conn = mongoose.connection;
    console.log("✅ Kết nối đến MongoDB thành công");
    console.log(
      `📦 DB info → host: ${conn.host}, name: ${conn.name}, collections: ${Object.keys(conn.collections).length}`
    );
  } catch (error) {
    console.log(error);

  }
};

export default connectToDatabase;
