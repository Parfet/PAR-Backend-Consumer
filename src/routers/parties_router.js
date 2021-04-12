const express = require('express')

const partiesController = require('../controllers/parties_controller')

const partiesRouter = express.Router();

partiesRouter.get('/', partiesController.getAllParty)
partiesRouter.post('/', partiesController.createParty)

module.exports = partiesRouter;