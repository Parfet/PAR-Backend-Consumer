require("dotenv").config();
const { sequelize } = require("../../models/index");
const axios = require("axios");

const models = require("../../models/index");
const userService = require("../services/users_service");
const partyService = require("../services/parties_service");
const restaurantService = require("../services/restaurants_service");
const ENUM = require("../constants/enum");
const checkErrorService = require("../utils/check_error");
const admin = require("../utils/firebase_admin");

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

      const partyList = [];

      for (const party of data[0].parties) {
        let _userWithDetailList = [];
        for (const member of party.members) {
          const _user = await userService.getUserByUserId({
            user_id: member.user_id,
          });

          if (_user === "") {
            return res.status(500).json({
              message: "user not found",
            });
          }

          _userWithDetailList.push(_user);
        }
        const partyResponse = {
          party_id: party.party_id,
          party_name: party.party_name,
          head_party: await userService.getUserByUserId({
            user_id: party.head_party,
          }),
          party_type: party.party_type,
          interested_topic: party.interested_topic,
          max_member: party.max_member,
          schedule_time: party.schedule_time,
          created_at: party.created_at,
          updated_at: party.updated_at,
          members: _userWithDetailList,
          interest_tags: party.interest_tags,
        };
        partyList.push(partyResponse);
      }

      return res.status(200).json({
        parties: partyList,
      });
    } catch (e) {
      console.log(e);
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
      if (data.length === 0) {
        return res.status(204).send();
      }
      const _userWithDetailList = [];
      for (const item of data[0].members) {
        const _user = await userService.getUserByUserId({
          user_id: item.user_id,
        });
        _userWithDetailList.push(_user);
      }

      const headPartyRaw = await userService.getUserByUserId({
        user_id: data[0].head_party,
      });

      if (headPartyRaw === "") {
        return res.status(500).json({
          message: "User not found",
        });
      }

      const partyResponse = {
        party_id: data[0].party_id,
        party_name: data[0].party_name,
        head_party: headPartyRaw,
        party_type: data[0].party_type,
        interested_topic: data[0].interested_topic,
        max_member: data[0].max_member,
        schedule_time: data[0].schedule_time,
        created_at: data[0].created_at,
        updated_at: data[0].updated_at,
        members: _userWithDetailList,
        interest_tags: data[0].interest_tags,
      };
      return res.status(200).json({
        party: partyResponse,
      });
    } catch (e) {
      console.log(e);
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
        return res.status(400).json({ message: "Party not found" });
      }

      if (party[0].head_party !== req.user) {
        return res.status(403).json({
          message: "Permission Denied",
        });
      }
      const data = await partyService.requestJoinList({
        party_id: req.params.party_id,
      });

      if (data.length === 0) {
        return res.status(204).json();
      }

      const requestList = [];

      for (const item of data) {
        const _user = await userService.getUserByUserId({
          user_id: item.user_id,
        });

        if (_user === "") {
          return res.status(500).json({
            message: "User not found",
          });
        }

        let requestItem = {
          party_id: item.party_id,
          user_id: item.user_id,
          display_name: _user.display_name,
          rating: 0.0,
          image_url: _user.image_url,
          status: item.status,
        };
        requestList.push(requestItem);
      }

      return res.status(200).json({
        request: requestList,
      });
    } catch (e) {
      console.log(e);
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
      const partyListRaw = await partyService.getPartyByUserId({
        user_id: req.user,
      });

      if (partyListRaw.length <= 0) {
        return res.status(204).json();
      }

      const partyList = [];

      for (const party of partyListRaw) {
        const memberList = [];

        const headPartyRaw = await userService.getUserByUserId({
          user_id: party.dataValues.head_party,
        });

        if (headPartyRaw === "") {
          return res.status(500).json({
            message: "user not found",
          });
        }

        const restaurantRaw = party.dataValues.restaurants[0];

        for (const member of party.dataValues.members) {
          const userRaw = await userService.getUserByUserId({
            user_id: member.user_id,
          });

          if (userRaw === "") {
            return res.status(500).json({
              message: "User not found",
            });
          }

          const userFormat = {
            user_id: member.user_id,
            provider: userRaw.provider,
            display_name: userRaw.display_name,
            email: userRaw.email,
            image_url: userRaw.image_url,
            username: userRaw.username,
          };

          memberList.push(userFormat);
        }

        const headPartyFormat = {
          user_id: party.dataValues.head_party,
          provider: headPartyRaw.provider,
          display_name: headPartyRaw.display_name,
          email: headPartyRaw.email,
          image_url: headPartyRaw.image_url,
          username: headPartyRaw.username,
        };

        const restaurantFormat = {
          restaurant_name: restaurantRaw.restaurant_name,
          restaurant_photo_ref: restaurantRaw.restaurant_photo_ref,
        };

        const partyFormat = {
          party_id: party.party_id,
          party_name: party.dataValues.party_name,
          head_party: headPartyFormat,
          party_type: party.dataValues.party_type,
          interested_topic: party.dataValues.interested_topic,
          max_member: party.dataValues.max_member,
          schedule_time: party.dataValues.schedule_time,
          created_at: party.dataValues.created_at,
          updated_at: party.dataValues.updated_at,
          archived_at: party.dataValues.archived_at,
          members: memberList,
          interest_tags: party.dataValues.interest_tags,
          restaurant: restaurantFormat,
        };

        partyList.push(partyFormat);
      }

      return res.status(200).json({
        parties: partyList,
      });
    } catch (e) {
      console.log(e);
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
      if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "Invalid Request" });
      }

      const {
        party_type,
        party_name,
        passcode,
        interested_topic,
        interest_tags,
        max_member,
        schedule_time,
        restaurant_photo_ref,
      } = req.body;
      const head_party = req.user;

      const head_party_raw = await userService.getUserByUserId({
        user_id: head_party,
      });

      if (head_party_raw === "") {
        return res.status(500).json({
          message: "User not found",
        });
      }

      const _interest_tag = await partyService.findInterstTagById({
        tag_id: interest_tags,
      });

      if (!party_type) {
        return res.status(400).json({ message: "party type cannot be null" });
      } else if (!checkErrorService.checkMatchEnum("PARTY_TYPE", party_type)) {
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
      if (_interest_tag.length < 1) {
        return res.status(400).json({
          message: "intestest tag is invalid",
        });
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
      const params = {
        key: process.env.GOOGLE_MAP_API_KEY,
        place_id: req.params.restaurant_id,
      };
      const restaurant = (
        await axios.get(
          "https://maps.googleapis.com/maps/api/place/details/json",
          { params }
        )
      ).data.result;
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
      const _restaurant = await restaurantService.findRestaurantByRestaurantId({
        restaurant_id: req.params.restaurant_id,
      });
      if (!_restaurant) {
        await restaurantService.createRestaurant({
          restaurant_id: restaurant.place_id,
          restaurant_name: restaurant.name,
          lat: restaurant.geometry.location.lat,
          lng: restaurant.geometry.location.lng,
          location: restaurant.vicinity,
          restaurant_photo_ref: restaurant_photo_ref,
          transaction: transaction,
        });
      }
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
      console.log(e);
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
      // TODO: check limit party member
      if (
        party[0].party_type === ENUM.PARTY_TYPE.PRIVATE &&
        (req.body.passcode === null || req.body.passcode !== party[0].passcode)
      ) {
        res.status(400).json({ message: "Passcode incorrect" });
      }
      const everJoin = await partyService.requestJoinByUserId({
        party_id: party[0].party_id,
        user_id: req.user,
      });
      if (everJoin.length > 0) {
        return res
          .status(400)
          .json({ message: "You already request to join this party" });
      }
      const data = await partyService.joinParty({
        party_id: req.params.party_id,
        user_id: req.user,
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
      console.log(e);
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
        if (!party[0]) {
          return res.status(400).json({ message: "Party not found" });
        }
        if (req.user !== party[0].head_party) {
          return res.status(403).json({
            message: "Permission Denied",
          });
        }
      }
      if (req.body.head_party) {
        const user = await models.users.findByPk(req.body.head_party);
        if (!user) {
          return res.status(500).json({ message: "User not found" });
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
      if (data) {
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
      const party = await partyService.findPartyByPartyId({
        party_id: req.params.party_id,
      });
      if (!party) {
        return res.status(400).json({ message: "Party not found" });
      }
      if (party[0].head_party !== req.user) {
        return res.status(403).json({
          message: "Permission Denied",
        });
      }
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

        if (user === "") {
          return res.status(500).json({
            message: "user not found",
          });
        }
        const findUserInParty = await partyService.handleCheckMemberRequest({
          party_id: req.params.party_id,
          user_id: req.body.user_id,
        });

        if (findUserInParty.length > 0) {
          return res.status(400).json({
            message: "cannot manage user that already party member or declined",
          });
        }
      }

      const data = await partyService.handleMemberRequest({
        user_id: req.body.user_id,
        party_id: req.params.party_id,
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

  leaveParty: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const party = await partyService.findPartyByPartyId({
        party_id: req.params.party_id,
      });

      if (party[0].head_party === req.user) {
        return res.status(400).json({
          message: "party owner can not leave party",
        });
      }

      const memberList = party[0].members.map((e) => e.user_id);

      if (memberList.includes(req.user)) {
        const data = await partyService.removePartyMember({
          party_id: req.params.party_id,
          user_id: req.user,
          transaction: transaction,
        });
        if (data) {
          await transaction.commit();
          return res.status(200).json({
            message: "leave party success",
          });
        } else {
          await transaction.rollback();
          return res.status(500).json({
            message: "leave party failed",
          });
        }
      }
      await transaction.rollback();
      return res.status(400).json({
        message: "only member of this party can leave party",
      });
    } catch (e) {
      await transaction.rollback();
      return res.status(500).json({
        message: e.message,
      });
    }
  },

  removeMember: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const party = await partyService.findPartyByPartyId({
        party_id: req.params.party_id,
      });
      if (party[0].head_party !== req.user) {
        return res.status(403).json({
          message: "Permission Denied",
        });
      }

      const memberList = party[0].members.map((e) => e.user_id);
      const user_id = req.body.user_id;

      if (!user_id) {
        return res.status(400).json({
          message: "required user target",
        });
      }
      if (!party) {
        return res.status(400).json({
          message: "party not found",
        });
      }
      if (party[0].head_party === user_id) {
        return res.status(400).json({
          message: "party owner can not remove own account from party",
        });
      }
      if (memberList.includes(user_id)) {
        const response = await partyService.removePartyMember({
          party_id: req.params.party_id,
          user_id: user_id,
          transaction: transaction,
        });
        if (response) {
          await transaction.commit();
          return res.status(200).json({
            message: "remove member success",
          });
        } else {
          await transaction.rollback();
          return res.status(500).json({
            message: "remove member failed",
          });
        }
      }
      await transaction.rollback();
      return res.status(400).json({
        message: "only member of this party can be remove",
      });
    } catch (e) {
      await transaction.rollback();
      return res.status(500).json({
        message: e.message,
      });
    }
  },

  getPartyRequestByUserId: async (req, res) => {
    try {
      const data = await partyService.waitingRequestJoinByUserId({
        user_id: req.user,
      });

      if (data.length === 0) {
        return res.status(204).json();
      }

      const waitingRequestList = [];

      for (const request of data) {
        const { party } = request;

        if (party.restaurants.length < 1) {
          return res.status(500).json({
            message: "restaurant not found",
          });
        }

        const restaurant = party.restaurants[0];

        const head_party = await userService.getUserByUserId({
          user_id: party.head_party,
        });

        const requestNewFormat = {
          party_id: request.party_id,
          party_name: party.party_name,
          head_party: {
            provider: head_party.provider,
            display_name: head_party.display_name,
            image_url: head_party.image_url,
            username: head_party.username,
          },
          interested_topic: party.interested_topic,
          schedule_time: party.schedule_time,
          status: request.status,
          restaurant_name: restaurant.restaurant_name,
          restaurant_photo_ref: restaurant.restaurant_photo_ref,
          interest_tags: party.interest_tags,
        };

        waitingRequestList.push(requestNewFormat);
      }

      return res.status(200).json({
        request_list: waitingRequestList,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err });
    }
  },
};
