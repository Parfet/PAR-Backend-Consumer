const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

const models = require("../../models/index");
const partyService = require("../services/parties_service");
const ENUM = require("../constants/enum");
const checkErrorService = require("../utils/check_error");
const { BadRequest } = require("../utils/errors");

module.exports = {
  //
  // * [POST] create party
  // TODO: implement error if request invalid
  // TODO: wait jwt and check head party user id from jwt
  //
  createParty: async (req, res) => {
    try {
      // * check is owner is member of system
      const head_party = await models.users.findByPk(req.body.head_party);
      const message = [];
      // TODO: wait refactor to service method
      if (Object.keys(req.body).length !== 0) {
        if (!head_party) {
          message.push("Owner party invalid");
        }
        if (!req.body.party_type) {
          message.push("party type cannot be null");
        } else if (
          !checkErrorService.checkMatchEnum("PARTY_TYPE", req.body.party_type)
        ) {
          message.push("party type is invalid");
        }
        if (!req.body.party_name) {
          message.push("party name cannot be null");
        }
        if (
          req.body.party_type === ENUM.PARTY_TYPE.PRIVATE &&
          !req.body.passcode
        ) {
          message.push("if party type is private passcode can not be null");
        }
        if (!req.body.interested_topic) {
          message.push("interest topic can not be null");
        }
        if (!req.body.interested_tag) {
          message.push("interest tag can not be null");
        }
        if (req.body.max_member === undefined) {
          console.log(req.body.max_member);
          message.push("max maxber cannot be null");
        } else if (req.body.max_member < 1) {
          message.push("max member must be more than 0");
        }
        if (!req.body.schedule_time) {
          message.push("schedule time cannot be null");
        }

        if (message.length > 0) {
          throw new BadRequest([...message]);
        }
      } else {
        return res.status(400).json({
          message: "Invalid Request",
        });
      }

      const party = await partyService.insertParty({
        head_party: req.body.head_party,
        party_name: req.body.party_name,
        passcode: req.body.passcode,
        party_type: req.body.party_type,
        interested_topic: req.body.interested_topic,
        interested_tag: req.body.interested_tag,
        max_member: req.body.max_member,
        schedule_time: req.body.schedule_time,
      });

      return res.status(200).json({
        party_id: party.party_id,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        message: e,
      });
    }
  },

  getAllParty: async (_req, res) => {
    try {
      const data = await partyService.findPartyAll();
      if (data.length <= 0) {
        return res.status(204).send();
      }
      return res.status(200).json({
        parties: data,
      });
    } catch (e) {
      return res.status(e.status).json({
        message: e.message,
      });
    }
  },

  getPartyByPartyId: async (req, res) => {
    try {
      const data = await partyService.findPartyByPartyId({
        party_id: req.params.party_id,
      });
      if (!data) {
        return res.status(204).send();
      }
      return res.status(200).json({
        party: data.dataValues,
      });
    } catch (e) {
      return res.status(500).json({
        message: e.message,
      });
    }
  },

  checkMemberRequestList: async (req, res) => {
    try {
      const party = await partyService.findPartyByPartyId({
        party_id: req.params.party_id,
      });
      if (!party) {
        throw new BadRequest("Party not found");
      }
      if (party.head_party !== req.body.user_id) {
        throw new BadRequest("Only party owner can view request join party");
      }
      const data = await partyService.checkRequestJoinList({
        party_id: req.params.party_id,
      });

      if (data.length === 0) {
        return res.status(204).json();
      }

      return res.status(200).json({
        request: data,
      });
    } catch (e) {
      return res.status(500).json({
        message: e.message,
      });
    }
  },

  joinPartyByPartyId: async (req, res) => {
    try {
      const err = [];
      const user = await models.users.findByPk(req.body.user_id);
      const party = await partyService.findPartyByPartyId({
        party_id: req.params.party_id,
      });
      if (user === null) {
        err.push("User not found");
      }
      if (party === null) {
        err.push("Party not found");
      }

      if (
        party.party_type === ENUM.PARTY_TYPE.PRIVATE &&
        req.body.passcode !== party.passcode
      ) {
        err.push("Passcode incorrect");
      }

      if (err.length > 0) {
        throw new BadRequest([...err]);
      }
      const data = await partyService.joinParty({
        party_id: req.params.party_id,
        user_id: req.body.user_id,
      });
      if (data.status === null) {
        return res.status(500).json({
          message: "Cannot join party",
        });
      }
      return res.status(200).json({
        message: "Request Success",
      });
    } catch (e) {
      return res.status(500).json({
        message: e.message,
      });
    }
  },
};
