import mongoose from "mongoose";
import expressAsyncHandler from "express-async-handler";

const dbConnect = expressAsyncHandler(async () => {
  await mongoose
    .connect(process.env.DATABASE_CONNECTION_STRING)
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.log(`Error: ${error.message}`);
      process.exit(1);
    });
});

export default dbConnect;
