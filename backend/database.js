import mongoose from 'mongoose';
import env from 'dotenv'

env.config();

export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Mongoose connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};