import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`\n MONGODB CONNECTED`);
  } catch (error) {
    console.error("MONGODB connection error: ", error);
  }
};

export default connectDB;
