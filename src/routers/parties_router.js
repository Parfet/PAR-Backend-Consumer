const express = require("express");

const partiesController = require("../controllers/parties_controller");

const partiesRouter = express.Router();

partiesRouter.get("/tags", partiesController.getAllTag);
partiesRouter.get("/me", partiesController.getPartyByUserId);

partiesRouter.get(
  "/:restaurant_id",
  partiesController.getAllPartyByRestaurantId
  );
  partiesRouter.post("/:restaurant_id", partiesController.createParty);
partiesRouter.get("/info/:party_id", partiesController.getPartyByPartyId);
partiesRouter.post("/info/:party_id", partiesController.archivedParty);
partiesRouter.put("/info/:party_id", partiesController.updatePartyInfo);
partiesRouter.delete("/info/:party_id/member", partiesController.removeMember)


partiesRouter.get(
  "/info/:party_id/join",
  partiesController.checkMemberRequestList
);
partiesRouter.post(
  "/info/:party_id/join",
  partiesController.joinPartyByPartyId
);

partiesRouter.put(
  "/info/:party_id/join",
  partiesController.handleMemberRequest
);

partiesRouter.delete('/:party_id', partiesController.leaveParty)

module.exports = partiesRouter;
