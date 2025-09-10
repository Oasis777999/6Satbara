const mongoose = require("mongoose");
const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email:{
        type:String
    },
    phone: {
      type: Number,
    },
    propertyName: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("inquiry", inquirySchema);
