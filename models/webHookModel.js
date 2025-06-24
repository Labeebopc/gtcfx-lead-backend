const mongoose = require("mongoose")

const webhookLogSchema = new mongoose.Schema({
  leadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Leads",
    required: true
  },
  status: {
    type: String,
    enum: ["sent", "failed"],
    required: true
  },
  responseCode: Number,
  responseBody: mongoose.Schema.Types.Mixed,
  createdAt: {
    type: Date,
    default: Date.now
  }
});