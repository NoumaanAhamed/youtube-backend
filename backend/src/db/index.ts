import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${MONGODB_URI}/${DB_NAME}`
    );
    console.log("Connected to database:", DB_NAME);
    console.log(
      "Connection Instance Host:",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.log("MongoDB Connection Error:", error);
    process.exit(1);
  }
};
