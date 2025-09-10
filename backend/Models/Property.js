const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    propertyType:{
      type:String
    },
    socity: {
      type: String,
    },
    minSize:{
      type:Number
    },
    maxSize:{
      type:Number
    },
    price: {
      type: Number
    },
    isNegociable:{ 
      type:Boolean
    },
    address: {
      type: String,
    },
    state: {
      type: String,
    },
    district: {
      type: String,
    },
    taluka: {
      type: String,
    },
    city: {
      type: String,
    },
    pincode: {
      type: String,
    },
    mapLocation:{
      type:String,
      default:"NA"
    },
    facing: {
      type: String,
    },
    cornerProperty: {
      type: Boolean,
    },
    gatedSocity: {
      type: Boolean,
    },
    openSide: {
      type: Number,
    },
    description: {
      type: String,
    },
    verified:{
      type:Boolean,
      default:false
    },
    images: {
      type: [String],
      default: [],
    },
    user:{
      type:Object
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("property", propertySchema);
