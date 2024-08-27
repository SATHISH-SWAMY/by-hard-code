import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_URI = "mongodb+srv://anthonyswamy370:DbLb6tWyRlMat5Sx@cluster0.43fzhth.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export const connect = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
};
