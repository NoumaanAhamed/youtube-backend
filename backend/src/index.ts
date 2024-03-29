// import dotenv if using npm,yarn and pnpm
// Bun -> inbuilt dotenv
// import dotenv from "dotenv"
// dotenv.config({ path:".env" })

import mongoose from "mongoose";
import { DB_NAME } from "./constants";
import { connectDB } from "./db";
import { app } from "./app";

const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Error starting server:", error);
      throw error;
    });

    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}...`);
    });
  })
  .catch((e) => {
    console.log("MongoDB Connection Failed", e);
  });

// (async () => {
//   try {
//     const client = await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`);
//     console.log("Connected to database:", DB_NAME);

//     app.on("error", (error) => {
//       console.log("Error starting server:", error);
//       throw error;
//     });

//     app.listen(PORT, () => {
//       console.log(`Listening on port ${PORT}...`);
//     });
//   } catch (error) {
//     console.log("Error connecting to database:", error);
//     throw error;
//   }
// })();
