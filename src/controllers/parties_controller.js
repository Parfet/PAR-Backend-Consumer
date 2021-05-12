const { sequelize } = require("../../models/index");
const models = require("../../models/index");
const userService = require("../services/users_service");
const partyService = require("../services/parties_service");
const restaurantService = require("../services/restaurants_service");
const ENUM = require("../constants/enum");
const checkErrorService = require("../utils/check_error");

module.exports = {
  // ==== [GET] ====
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

      if (party.head_party !== req.user) {
        res.status(403).json({
          message: "Permission Denied",
        });
      }
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

  getAllTag: async (_, res) => {
    try {
      const data = await partyService.getInterestTag();
      return res.status(200).json({
        tags: data,
      });
    } catch (e) {
      return res.status(500).json({
        message: e.message,
      });
    }
  },

  getPartyByUserId: async (req, res) => {
    try {
      const user = await userService.getUserByUserId({
        user_id: req.user,
      });
      if (!user) {
        return res.staus(400).json({
          message: "User not found",
        });
      }
      const party = await partyService.getPartyByUserId({
        user_id: req.user,
      });
      return res.status(200).json({
        parties: party,
      });
    } catch (e) {
      return res.status(500).json({
        message: e.message,
      });
    }
  },

  // ==== [POST] ====
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
    const transaction = await sequelize.transaction();
    try {
      const {
        party_type,
        party_name,
        passcode,
        interested_topic,
        interest_tags,
        max_member,
        schedule_time,
        head_party,
      } = req.body;
      if (Object.keys(req.body).length === 0) {
        res.status(400).json({ message: "Invalid Request" });
      } else {
        const _head_party = await models.users.findByPk(head_party);
        const restaurant = await restaurantService.findRestaurantByRestaurantId(
          {
            restaurant_id: req.params.restaurant_id,
          }
        );
        // TODO: wait refactor to util method
        if (!_head_party) {
          return res.status(400).json({ message: "Owner party invalid" });
        }
        if (!restaurant) {
          return res.status(400).json({ message: "Restaurant not found" });
        }
        if (!party_type) {
          return res.status(400).json({ message: "party type cannot be null" });
        } else if (
          !checkErrorService.checkMatchEnum("PARTY_TYPE", party_type)
        ) {
          return res.status(400).json({ message: "party type is invalid" });
        }
        if (!party_name) {
          return res.status(400).json({ message: "party name cannot be null" });
        }
        if (party_type === ENUM.PARTY_TYPE.PRIVATE && !passcode) {
          return res.status(400).json({
            message: "if party type is private passcode can not be null",
          });
        }
        if (!interested_topic) {
          return res
            .status(400)
            .json({ message: "interest topic can not be null" });
        }
        if (!interest_tags) {
          return res
            .status(400)
            .json({ message: "interest tag can not be null" });
        }
        if (!max_member) {
          return res.status(400).json({ message: "max maxber cannot be null" });
        } else if (max_member < 1) {
          return res
            .status(400)
            .json({ message: "max member must be more than 0" });
        }
        if (!schedule_time) {
          return res
            .status(400)
            .json({ message: "schedule time cannot be null" });
        }
      }

      const party = await partyService.createParty({
        head_party: head_party,
        party_name: party_name,
        passcode: passcode,
        party_type: party_type,
        interested_topic: interested_topic,
        max_member: max_member,
        schedule_time: schedule_time,
        transaction: transaction,
      });

      await restaurantService.createParty({
        restaurant_id: req.params.restaurant_id,
        party_id: party.party_id,
        transaction: transaction,
      });

      await partyService.joinParty({
        user_id: head_party,
        party_id: party.party_id,
        status: ENUM.REQUEST_STATUS.ACCEPT,
        transaction: transaction,
      });

      for (const interest_tag of interest_tags) {
        await models.parties_interest_tags.create(
          {
            party_id: party.party_id,
            tag_id: interest_tag,
          },
          { transaction }
        );
      }
      await transaction.commit();

      return res.status(200).json({
        party_id: party.party_id,
      });
    } catch (e) {
      await transaction.rollback();
      return res.status(500).json({
        message: e.message,
      });
    }
  },

  joinPartyByPartyId: async (req, res) => {
    const transaction = await sequelize.transaction();
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
        transaction: transaction,
      });
      if (data.status === null) {
        return res.status(500).json({
          message: "Cannot join party",
        });
      }
      await transaction.commit();
      return res.status(200).json({
        message: "Request Success",
      });
    } catch (e) {
      await transaction.rollback();
      return res.status(500).json({
        message: e.message,
      });
    }
  },

  // ==== [PUT] ====
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
      if (req.params.party_id) {
        const party = await partyService.findPartyByPartyId({
          party_id: req.params.party_id,
        });
        if (!party) {
          return res.status(400).json({ message: "Party not found" });
        }
        if (req.user !== party.head_party) {
          return res.status(403).json({
            message: "Permission Denied",
          });
        }
      }
      if (req.body.head_party) {
        const user = await models.users.findByPk(req.body.head_party);
        if (!user) {
          return res.status(400).json({ message: "User not found" });
        }
        const member = await partyService.checkIsMemberParty({
          party_id: req.params.party_id,
          user_id: user.user_id,
        });
        if (member.length === 0) {
          return res
            .status(400)
            .json({ message: "Only member can assign to be party owner." });
        }
      }
      if (req.body.party_type) {
        if (
          !checkErrorService.checkMatchEnum("PARTY_TYPE", req.body.party_type)
        ) {
          return res.status(400).json({ message: "Party type invalid" });
        }
        if (
          req.body.party_type === ENUM.PARTY_TYPE.PRIVATE &&
          !req.body.passcode
        ) {
          return res
            .status(400)
            .json({ message: "Private party must have passcode" });
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
    const transaction = await sequelize.transaction();
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
        await transaction.commit();
        return res.status(200).json({
          message: "update success",
        });
      } else {
        await transaction.rollback();
        return res.status(500).json({
          message: "update failed",
        });
      }
    } catch (e) {
      await transaction.rollback();
      return res.status(500).json({
        message: e.message,
      });
    }
  },
};
