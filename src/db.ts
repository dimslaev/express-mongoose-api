import mongoose, { ConnectOptions } from "mongoose";

export const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('Missing environment variable: "MONGODB_URI"');
  }

  if (!process.env.DB_NAME) {
    throw new Error('Missing environment variable: "DB_NAME"');
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: process.env.DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    } as ConnectOptions);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
