const express = require("express");

const partiesController = require("../controllers/parties_controller");

const partiesRouter = express.Router();

partiesRouter.get("/", partiesController.getAllParty);
partiesRouter.get("/:party_id", partiesController.getPartyByPartyId);

partiesRouter.post("/", partiesController.createParty);

partiesRouter.get("/:party_id/join", partiesController.checkMemberRequestList);
partiesRouter.post("/:party_id/join", partiesController.joinPartyByPartyId);

module.exports = partiesRouter;
