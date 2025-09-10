const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName:{
        type:String
    },
    mobile: {
      type: Number,
    },
    email: {
      type: String,
    },
    intersted: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("contact", contactSchema);
