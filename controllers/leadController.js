const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
// const { generateToken } = require("../auth-token/jwt-token.js");
const Lead = require('../models/leadModel')
const WebhookLog = require("../models/webHookModel");
const axios = require("axios")


//@disc Lead Registration
//@api POST /leads
//@access Public
exports.leadRegistration = asyncHandler(async (req, res) => {

    const { name, email, phone, source, submitted_at, isActive } = req.body;

    try {

        if (!name || !email || !phone || !source || !submitted_at) {
            return res.status(400).json({ error: 'Required field is missing !' });
        }

        const existingLead = await Lead.findOne({ email: email });
        if (existingLead) {
            return res
                .status(400)
                .json({ status: false, message: "Lead already exists" });
        }

        if (!existingLead) {

            const lead = await Lead.create({ name, email, phone, source, submitted_at, isActive });
            
            try {

                const response = await axios.post("https://fake-crm.com/api/leads", lead);
                await WebhookLog.create({
                    leadId: lead._id,
                    status: "sent",
                    responseCode: response.status,
                    responseBody: response.data
                });

            } catch (err) {
                await WebhookLog.create({
                    leadId: lead._id,
                    status: "failed",
                    responseCode: err.response?.status || 500,
                    responseBody: err.response?.data || err.message
                });
            }

            return res
                .status(201)
                .json({ status: true, lead, message: "Lead successfully created" });
        }
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
});

//@disc Get All Leads
//@api GET /leads
exports.getAllLeads = asyncHandler(async (req, res) => {

    try {

        const { source, page = 1, limit = 10 } = req.query;
        const filter = {isActive: true};

        if (source) filter.source = source;

        const allLeads = await Lead.find(filter).skip((page - 1) * limit).limit(parseInt(limit));

        if (!allLeads) {
            return res.status(404).json({ status: false, message: "Leads not found" });
        }
        return res.status(200).json({
            status: true,
            allLeads
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Error in fetching all leads" });
    }
});


//@disc Get Lead Data
//@api GET /leads
//@access Private
exports.getLeadData = asyncHandler(async (req, res) => {
    const id  = req.params.id

    try {
        const lead = await Lead.findById(id);

        if (!lead) {
            return res.status(404).json({ status: false, message: "Lead not found" });
        }
        return res.status(200).json({
            status: true,
            lead
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Error" });
    }
});


//@disc Update Lead
//@api PUT /leads
//@access Private
exports.updateLead = asyncHandler(async (req, res) => {
    const id = req.params.id
    try {
        const { _id, ...updateData } = req.body;
        const updated = await Lead.findByIdAndUpdate(id, updateData, { new: true });

        if (!updated) return res.status(404).json({ error: 'Lead not found' });

        return res.status(200).json({ status: true, updated, message: "Lead successfully updated" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: false, message: error.message })
    }
});

//@disc Delete Lead
//@api DELETE /leads
//@access Private
exports.deleteLead = asyncHandler(async (req, res) => {
    const id = req.params.id
    try {

        // const removeLead = await Lead.findByIdAndDelete(id);
        const updateLead = await Lead.findByIdAndUpdate(id, { isActive: false }, { new: true });
        if (!updateLead) return res.status(404).json({ message: "Lead not found" });

        return res.status(200).json({ status: true, message: "Lead marked as inactive", updateLead })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: false, message: error.message })
    }
});

