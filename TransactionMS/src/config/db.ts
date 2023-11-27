import mongoose from "mongoose";
import logger from "../utils/logger";

export interface MongoDbConfig {
  uri?: string;
  options?: mongoose.ConnectOptions;
}

class MongoConnection {
  public constructor() {}

  public async init(config: MongoDbConfig) {
    if (!config.uri) {
      throw new Error("MongoDB URI not defined");
    }

    try {
      const conn = await mongoose.connect(config.uri, config.options);
      logger.info(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      logger.error(`MongoDB Connection Error: ${error}`);
      if (error instanceof mongoose.Connection) {
        process.exit(1);
      }
    }
  }

  public close() {
    mongoose.connection.close();
  }
}

export default MongoConnection;
