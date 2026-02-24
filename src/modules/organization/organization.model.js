const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    subscriptionPlan: {
      type: String,
      enum: ["FREE", "PRO", "ENTERPRISE"],
      default: "FREE",
    },
    isActive: { 
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true } //it is used to automatically add createdAt and updatedAt fields to the schema
);

module.exports = mongoose.model("Organization", organizationSchema);