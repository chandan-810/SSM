const mongoose = require("mongoose");

// Drop existing indexes to clean up any inconsistent field names
if (mongoose.models.users) {
  delete mongoose.models.users;
}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // This ensures email is always stored in lowercase
    trim: true, // Remove any whitespace
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["Teacher", "Parent", "Admin"],
    default: "Parent",
  },
});

// Ensure email is lowercase before saving
UserSchema.pre("save", function (next) {
  if (this.email) {
    this.email = this.email.toLowerCase();
  }
  next();
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
