const mongoose = require("mongoose");

const flatsSchema = new mongoose.Schema(
  {
    socity: {
      type: String,
    },
    apartmentName: {
      type: String,
    },
    flatNumber: {
      type: String,
    },
    floor: {
      type: Number,
    },
    totalFloors: {
      type: Number,
    },
    bedrooms: {
      type: Number,
    },
    bathrooms: {
      type: Number,
    },
    balconies: {
      type: Number,
    },
    furnishing: {
      type: String,
      default: "Unfurnished",
    },
    carpetArea: {
      type: Number,
    },
    builtupArea: {
      type: Number,
    },
    possession: {
      type: Date,
    },
    facing: {
      type: String,
    },
    price: {
      type: Number,
    },
    isNegociable: {
      type: Boolean,
      default: false,
    },
    maintenanceCost: {
      type: String,
    },
    gatedSocity: {
      type: Boolean,
      default: false,
    },
    parking: {
      type: String,
    },
    reraStatus: {
      type: Boolean,
    },
    reraNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    taluka: {
      type: String,
    },
    district: {
      type: String,
    },
    state: {
      type: String,
    },
    pincode: {
      type: Number,
    },
    about: {
      type: String,
    },
    images: {
      type: [String],
      default: [],
    },
    user: {
      type: Object,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const apartmentFlat = mongoose.model("apartmentFlat", flatsSchema);

module.exports = apartmentFlat;
