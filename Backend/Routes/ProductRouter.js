const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// const UserModel = mongoose.model("users", UserSchema);
const UserModel = mongoose.models.users || mongoose.model("users", userSchema);

module.exports = UserModel;
