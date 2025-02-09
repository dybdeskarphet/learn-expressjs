import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGODB_URL) {
  console.error("Add database URL to the .env file");
}

const connectDB = async (filename: string) => {
  try {
    console.log(`MongoDB connecting in ${filename}`);
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log(`MongoDB connected in ${filename}`);
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1); // Exit if connection fails
  }
};

export { connectDB };
