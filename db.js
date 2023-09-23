const mongoose = require("mongoose");

async function db() {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`MongoDB Connected: ${connect.connection.host}`.cyan);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`.red);
    process.exit(1);
  };
};

module.exports = db;
