const { leadRegistration, getAllLeads, deleteLead, getLeadData, updateLead } = require("../controllers/leadController");

const router = require("express").Router()

//LEAD_REGISTRATION || POST
router.post("/api/lead_registration", leadRegistration);

//GET_ALL_LEADS || GET
router.get("/api/get_all_leads", getAllLeads);

//GET_LEAD_DATA || GET
router.get("/api/get_lead_data/:id", getLeadData);

//UPDATE_LEAD || PUT
router.put("/api/update_lead/:id", updateLead);

//DELETE_LEAD || DELETE
router.delete("/api/delete_lead/:id", deleteLead);



module.exports = router;