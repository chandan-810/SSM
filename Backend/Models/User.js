const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new schema({
  name: {
    type: String,
    require: true,
  },
  Email: {
    type: String,
    require: true,
    unique: true,
  },
  Password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: true,
    enum: ["Teacher", "Parent", "Admin"],
  },
});
// const Usermodel = mongoose.model("users", UserSchema);
const Usermodel = mongoose.models.users || mongoose.model("users", UserSchema);

module.exports = Usermodel;
