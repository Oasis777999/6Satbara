const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    phone: {
      type: Number,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    role:{
      type:String
    },
    isAdmin:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
