const { leadRegistration, getAllLeads, deleteLead, getLeadData, updateLead } = require("../controllers/leadController");

const router = require("express").Router()

//LEAD_REGISTRATION || POST
router.post("/api/leads", leadRegistration);

//GET_ALL_LEADS || GET
router.get("/api/leads", getAllLeads);

//GET_LEAD_DATA || GET
router.get("/api/leads/:id", getLeadData);

//UPDATE_LEAD || PUT
router.put("/api/leads/:id", updateLead);

//DELETE_LEAD || DELETE
router.delete("/api/leads/:id", deleteLead);



module.exports = router;