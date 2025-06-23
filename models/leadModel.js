const mongoose = require("mongoose")

// Lead Schema
const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },

    email: {
        type: String,
        required: [true, "Please enter your email"]
    },

    phone: {
        type: String,
        required: [true, "Please enter your phone"]
    },

    source: {
        type: String,
        required: [true, "Please enter the source"]
    },

    submitted_at: {
        type: Date
    },

    active: {
        type: Boolean, default: true
    }

}, { timestamps: true })

const leadModel = mongoose.model("Leads", leadSchema)

module.exports = leadModel;