import mongoose, { connect } from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    console.log(process.env.PORT);
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}.${DB_NAME}`
    );

    console.log(`MongoDB Connected to ${connectionInstance.connection.host}`);
  } catch (err) {
    console.log("MongoDB Connection Failed ", err);
    process.exit(1); //exit the application immediately
  }
};

export default connectDB;
