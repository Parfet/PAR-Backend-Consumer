const moment = require("moment");

const models = require("../../models/index");
const partyService = require("../services/parties_service");
const restaurantService = require("../services/restaurants_service");
const ENUM = require("../constants/enum");
const checkErrorService = require("../utils/check_error");
const { BadRequest } = require("../utils/errors");

module.exports = {
  //
  // * [POST] create party
  // TODO: implement error if request invalid
  // TODO: wait jwt and check head party user id from jwt
  /* 
  @param restaurant_id
  @body head_party
  @body party_name
  @body party_type
  @body passcode
  @body interested_topic
  @body interested_tag
  @body max_member
  @body schedule_time
   */
  createParty: async (req, res) => {
    try {
      if (Object.keys(req.body).length === 0) {
        throw new BadRequest("Invalid Request");
      } else {
        // * check is owner is member of system
        const head_party = await models.users.findByPk(req.body.head_party);
        // * check isValid restaurant
        const restaurant = await restaurantService.findRestaurantByRestaurantId(
          {
            restaurant_id: req.params.restaurant_id,
          }
        );
        const message = [];
        // TODO: wait refactor to util method
        if (!head_party) {
          message.push("Owner party invalid");
        }
        if (!restaurant) {
          message.push("Restaurant not found");
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
      }

      const party = await partyService.createParty({
        head_party: req.body.head_party,
        party_name: req.body.party_name,
        passcode: req.body.passcode,
        party_type: req.body.party_type,
        interested_topic: req.body.interested_topic,
        interested_tag: req.body.interested_tag,
        max_member: req.body.max_member,
        schedule_time: req.body.schedule_time,
      });

      await restaurantService.createParty({
        restaurant_id: req.params.restaurant_id,
        party_id: party.party_id,
      });

      await partyService.joinParty({
        user_id: req.body.head_party,
        party_id: party.party_id,
        status: ENUM.REQUEST_STATUS.ACCEPT,
      });

      return res.status(200).json({
        party_id: party.party_id,
      });
    } catch (e) {
      return res.status(400).json({
        message: e,
      });
    }
  },

  /* 
    @param rstaurant_id
   */
  getAllPartyByRestaurantId: async (req, res) => {
    try {
      const data = await partyService.findPartyByRestaurantId({
        restaurant_id: req.params.restaurant_id,
      });
      if (data.length === 0) {
        return res.status(204).json();
      }
      return res.status(200).json({
        parties: data[0].parties,
      });
    } catch (e) {
      return res.status(500).json({
        message: e.message,
      });
    }
  },

  /* 
    @param party_id
  */
  getPartyByPartyId: async (req, res) => {
    try {
      const data = await partyService.findPartyByPartyId({
        party_id: req.params.party_id,
      });
      if (!data) {
        return res.status(204).send();
      }
      return res.status(200).json({
        party: data[0],
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
      // TODO: wait jwt
      // if (party.head_party !== req.body.user_id) {
      //   res.status(403).json({
      //     message: "Only party owner can view request join party",
      //   });
      // }
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
      const user = await models.users.findByPk(req.body.user_id);
      const party = await partyService.findPartyByPartyId({
        party_id: req.params.party_id,
      });
      if (user === null) {
        throw new BadRequest("User not found");
      }
      if (party === null) {
        throw new BadRequest("Party not found");
      }
      if (
        party.party_type === ENUM.PARTY_TYPE.PRIVATE &&
        req.body.passcode !== party.passcode
      ) {
        throw new BadRequest("Passcode incorrect");
      }
      const data = await partyService.joinParty({
        party_id: req.params.party_id,
        user_id: req.body.user_id,
        status: ENUM.REQUEST_STATUS.WATING,
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

  archivedParty: async (req, res) => {
    try {
      const party = await partyService.findPartyByPartyId({
        party_id: req.params.party_id,
      });
      if (!party) {
        throw new BadRequest("Party not found");
      }
      if (party.head_party !== req.body.user_id) {
        return res.status(403).json({
          message: "Only party owner can close party.",
        });
      }
      const data = await partyService.archiveParty({
        party_id: req.params.party_id,
        archived_at: moment(),
      });
      if (data) {
        return res.status(200).json({
          message: "archive success",
        });
      } else {
        return res.status(500).json({
          message: "archive failed",
        });
      }
    } catch (e) {
      return res.status(500).json({
        message: e.message,
      });
    }
  },
};
