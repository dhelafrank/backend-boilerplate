import mongoose from "mongoose";
import { Configs } from "../configs";
import logger from "../utils/logger";

export async function initializeDatabase() {
  try {
     await mongoose.connect(Configs.mongoUrl);
    logger.info("Database connected");
  } catch (error) {
    logger.error(`Database connection failed. Error: ${error}`);
    process.exit(1);
  }
}