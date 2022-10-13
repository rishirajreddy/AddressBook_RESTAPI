const express = require('express');
const router = express.Router();
const contactControl = require("../controllers/contactController");
const checkToken  = require("../middlewares/checkToken");

//Get all contacts using pagination
router.get("/", 
            checkToken.checkToken,
            contactControl.getAllContacts);
//Get details of a contact
router.get("/:id", 
            checkToken.checkToken,
            contactControl.getContact);
//Add contact
router.post("/add", 
            checkToken.checkToken,
            contactControl.createContact);
//Add bulk contacts
router.post("/bulk", 
            checkToken.checkToken, 
            contactControl.insertBulkContacts);
//Update Contact
router.put("/:id", 
            checkToken.checkToken,
            contactControl.updateContact);
//Delete contact
router.delete("/:id", 
                checkToken.checkToken,
                contactControl.deleteContact);
//Get matched contacts
router.post("/",
            checkToken.checkToken,
            contactControl.fetchMatchingContact        
);

module.exports = router;