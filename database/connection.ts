import mongoose from "mongoose";

let isConnected: boolean = false;
let count = 0;
export const connectDB = () => {
  const URL = process.env.DB_URL;
  // if (!URL) throw new Error("DB URL missing");
  if (isConnected) {
    count = count + 1;
    console.log("DB is already connected || connectionTries:", count);
    return;
  }
  mongoose
    .connect(URL!, { dbName: "DevFlow" })
    .then(() => {
      isConnected = true;
      console.log("DB connection successfull");
    })
    .catch((e) => console.error("Error while connecting to DB", e));
};
