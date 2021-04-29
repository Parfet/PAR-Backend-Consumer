const express = require("express");

const partiesController = require("../controllers/parties_controller");

const partiesRouter = express.Router();

partiesRouter.get("/:restaurant_id", partiesController.getAllPartyByRestaurantId);
partiesRouter.post("/:restaurant_id", partiesController.createParty);

partiesRouter.get("/info/:party_id", partiesController.getPartyByPartyId);
partiesRouter.put("/info/:party_id", partiesController.archivedParty);


partiesRouter.get("/info/:party_id/join", partiesController.checkMemberRequestList);
partiesRouter.post("/info/:party_id/join", partiesController.joinPartyByPartyId);

module.exports = partiesRouter;
