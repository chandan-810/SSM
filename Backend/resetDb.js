const mongoose = require("mongoose");
require("dotenv").config();

const resetDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_CONN);
    console.log("Connected to MongoDB...");

    // Drop the users collection
    await mongoose.connection.collection("users").drop();
    console.log("Users collection dropped successfully");

    // Drop all indexes
    await mongoose.connection.collection("users").dropIndexes();
    console.log("Indexes dropped successfully");

    console.log("Database reset complete!");
  } catch (err) {
    if (err.code === 26) {
      console.log("Collection doesn't exist, proceeding...");
    } else {
      console.error("Error resetting database:", err);
    }
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
    process.exit(0);
  }
};

resetDatabase();
