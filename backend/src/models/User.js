const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["Admin", "User"],
    default: "User",
  },
  plan:{type:[mongoose.Schema.Types.ObjectId], required: true},
  otherUsers:{type:[mongoose.Schema.Types.ObjectId], default:[]},
  remainingDays:{type: Number, default: 14}
//   organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", UserSchema);
