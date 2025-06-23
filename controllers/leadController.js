const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
// const { generateToken } = require("../auth-token/jwt-token.js");
const Lead = require('../models/leadModel')


//@disc Lead Registration
//@api POST /lead_registration
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

            return res
                .status(201)
                .json({ status: true, lead, message: "Lead successfully created" });
        }
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
});

//@disc Get All Leads
//@api GET /get_all_leads
exports.getAllLeads = asyncHandler(async (req, res) => {

    try {

        const { source, page = 1, limit = 10 } = req.query;
        const filter = {};

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
//@api GET /get_lead_data
//@access Private
exports.getLeadData = asyncHandler(async (req, res) => {
    const {id} = req.params.id

    try {
        const lead = await Lead.findOne(id);

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
//@api PUT /update_lead
//@access Private
exports.updateLead = asyncHandler(async (req, res) => {
    const  id  = req.params.id
    try {

        const updated = await Lead.findByIdAndUpdate(id, req.body, { new: true });

        if (!updated) return res.status(404).json({ error: 'Lead not found' });

        return res.status(200).json({ status: true, updated, message: "Lead successfully updated" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: false, message: error.message })
    }
});

//@disc Delete Lead
//@api DELETE /delete_lead
//@access Private
exports.deleteLead = asyncHandler(async (req, res) => {
    const id  = req.params.id
    try {

        const removeLead = await Lead.findByIdAndDelete(id);
        return res.status(200).json({ status: true, message: "Lead successfully deleted" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: false, message: error.message })
    }
});

