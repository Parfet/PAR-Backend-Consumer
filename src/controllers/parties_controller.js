const models = require("../../models/index");
const userService = require("../services/users_service");
const partyService = require("../services/parties_service");
const restaurantService = require("../services/restaurants_service");
const ENUM = require("../constants/enum");
const checkErrorService = require("../utils/check_error");

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
        res.status(400).json({ message: "Invalid Request" });
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
          return res.status(400).json({ message: "Owner party invalid" });
        }
        if (!restaurant) {
          return res.status(400).json({ message: "Restaurant not found" });
        }
        if (!req.body.party_type) {
          return res.status(400).json({ message: "party type cannot be null" });
        } else if (
          !checkErrorService.checkMatchEnum("PARTY_TYPE", req.body.party_type)
        ) {
          return res.status(400).json({ message: "party type is invalid" });
        }
        if (!req.body.party_name) {
          return res.status(400).json({ message: "party name cannot be null" });
        }
        if (
          req.body.party_type === ENUM.PARTY_TYPE.PRIVATE &&
          !req.body.passcode
        ) {
          return res
            .status(400)
            .json({
              message: "if party type is private passcode can not be null",
            });
        }
        if (!req.body.interested_topic) {
          return res
            .status(400)
            .json({ message: "interest topic can not be null" });
        }
        if (!req.body.interested_tag) {
          return res
            .status(400)
            .json({ message: "interest tag can not be null" });
        }
        if (req.body.max_member === undefined) {
          return res.status(400).json({ message: "max maxber cannot be null" });
        } else if (req.body.max_member < 1) {
          return res
            .status(400)
            .json({ message: "max member must be more than 0" });
        }
        if (!req.body.schedule_time) {
          return res
            .status(400)
            .json({ message: "schedule time cannot be null" });
        }

        if (message.length > 0) {
          res.status(400).json({ message: [...message] });
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
        res.status(400).json({ message: "Party not found" });
      }
      // TODO: wait jwt
      // if (party.head_party !== req.body.user_id) {
      //   res.status(403).json({
      //     message: "Permission Denied",
      //   });
      // }
      const data = await partyService.requestJoinList({
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
      const party = await partyService.findPartyByPartyId({
        party_id: req.params.party_id,
      });
      if (party.length === 0) {
        res.status(400).json({ message: "Party not found" });
      }
      if (
        party[0].party_type === ENUM.PARTY_TYPE.PRIVATE &&
        (req.body.passcode === null || req.body.passcode !== party[0].passcode)
      ) {
        res.status(400).json({ message: "Passcode incorrect" });
      }
      const everJoin = await partyService.requestJoinByUserId({
        party_id: party[0].party_id,
        user_id: req.body.user_id,
      });
      if (everJoin.length > 1) {
        return res
          .status(400)
          .json({ message: "You already request to join this party" });
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
        res.status(400).json({ message: "Party not found" });
      }
      if (party.head_party !== req.body.user_id) {
        return res.status(403).json({
          message: "Permission Denied",
        });
      }
      const data = await partyService.archiveParty({
        party_id: req.params.party_id,
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

  updatePartyInfo: async (req, res) => {
    try {
      // TODO: wait jwt check is party owner
      if (req.params.party_id) {
        const party = await partyService.findPartyByPartyId({
          party_id: req.params.party_id,
        });
        if (!party) {
          res.status(400).json({ message: "Party not found" });
        }
      }
      if (req.body.head_party) {
        const user = await models.users.findByPk(req.body.head_party);
        if (!user) {
          res.status(400).json({ message: "User not found" });
        }
        const member = await partyService.checkIsMemberParty({
          party_id: req.params.party_id,
          user_id: user.user_id,
        });
        if (member.length === 0) {
          res
            .status(400)
            .json({ message: "Only member can assign to be party owner." });
        }
      }
      if (req.body.party_type) {
        if (
          !checkErrorService.checkMatchEnum("PARTY_TYPE", req.body.party_type)
        ) {
          res.status(400).json({ message: "Party type invalid" });
        }
        if (
          req.body.party_type === ENUM.PARTY_TYPE.PRIVATE &&
          !req.body.passcode
        ) {
          res.status(400).json({ message: "Private party must have passcode" });
        }
      }
      const data = await partyService.updatePartyInfo({
        party_id: req.params.party_id,
        party_name: req.body.party_name,
        head_party: req.body.head_party,
        passcode: req.body.passcode,
        party_type: req.body.party_type,
        interested_topic: req.body.interested_topic,
        interested_tag: req.body.interested_tag,
        max_member: req.body.max_member,
        schedule_time: req.body.schedule_time,
        archived_at: req.body.archived_at,
      });
      if (data.includes(1)) {
        return res.status(200).json({
          message: "update success",
        });
      } else {
        return res.status(500).json({
          message: "update failed",
        });
      }
    } catch (e) {
      return res.status(500).json({
        message: e.message,
      });
    }
  },

  handleMemberRequest: async (req, res) => {
    try {
      if (
        !checkErrorService.checkMatchEnum("REQUEST_STATUS", req.body.status)
      ) {
        return res.status(400).json({
          message: "Status is invalid",
        });
      }

      if (!req.body.user_id) {
        return res.status(400).json({
          message: "User is invalid",
        });
      } else {
        const user = await userService.getUserByUserId({
          user_id: req.body.user_id,
        });
        if (!user) {
          return res.status(400).json({
            message: "User not found",
          });
        }
        const findUserInParty = await partyService.handleCheckMemberRequest({
          party_id: req.params.party_id,
          user_id: req.body.user_id,
        });
        if (findUserInParty.length > 0) {
          return res.status(400).json({
            message: "update failed",
          });
        }
      }

      const data = await partyService.handleMemberRequest({
        user_id: req.body.user_id,
        status: req.body.status,
      });

      if (data.includes(1)) {
        return res.status(200).json({
          message: "update success",
        });
      } else {
        return res.status(500).json({
          message: "update failed",
        });
      }
    } catch (e) {
      return res.status(500).json({
        message: e.message,
      });
    }
  },
};
