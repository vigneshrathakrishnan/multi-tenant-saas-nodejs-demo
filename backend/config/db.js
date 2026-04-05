import mongoose from "mongoose";

export const connectDB = async (connStr) => {
  try {
    await mongoose.connect("mongodb+srv://admin:admin%40123@cluster0.kcogjdj.mongodb.net/?appName=Cluster0");
    // await mongoose.connect(connStr);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};