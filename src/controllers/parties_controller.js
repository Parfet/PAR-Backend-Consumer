require("dotenv").config();
const { sequelize } = require("../../models/index");
const axios = require("axios");
const moment = require("moment");

const models = require("../../models/index");
const userService = require("../services/users_service");
const partyService = require("../services/parties_service");
const restaurantService = require("../services/restaurants_service");
const ENUM = require("../constants/enum");
const helper = require("../utils/helper");

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

      const party_list = [];

      for (const party of data[0].parties) {
        // TODO: wait migrate timestamp field from string to datetime
        const _diff_time = moment(party.dataValues.schedule_time).diff(
          moment().format(),
          "minutes"
        );
        if (_diff_time > 0) {
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
            open_chat_link: party.open_chat_link,
            members: _userWithDetailList,
            interest_tags: party.interest_tags,
          };
          party_list.push(partyResponse);
        }
      }

      return res.status(200).json({
        parties: party_list,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: e.message || e,
      });
    }
  },

  /* 
    @param party_id
  */
  getPartyByPartyId: async (req, res) => {
    try {
      const data = await partyService.findPartyAndRestaurantInfoByPartyId({
        party_id: req.params.party_id,
      });
      if (data.length === 0) {
        return res.status(204).send();
      }
      const _user_with_detail_list = [];
      for (const item of data[0].members) {
        const _user = await userService.getUserByUserId({
          user_id: item.user_id,
        });
        _user_with_detail_list.push(_user);
      }

      const head_party_raw_data = await userService.getUserByUserId({
        user_id: data[0].head_party,
      });

      if (head_party_raw_data === "") {
        return res.status(500).json({
          message: "User not found",
        });
      }

      const party_response = {
        party_id: data[0].party_id,
        party_name: data[0].party_name,
        head_party: head_party_raw_data,
        party_type: data[0].party_type,
        interested_topic: data[0].interested_topic,
        max_member: data[0].max_member,
        schedule_time: data[0].schedule_time,
        created_at: data[0].created_at,
        updated_at: data[0].updated_at,
        members: _user_with_detail_list,
        interest_tags: data[0].interest_tags,
        open_chat_link: data[0].open_chat_link,
        restaurant: {
          restaurant_name: data[0].restaurants[0].restaurant_name,
          restaurant_photo_ref: data[0].restaurants[0].restaurant_photo_ref,
        },
      };
      return res.status(200).json({
        party: party_response,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: e.message || e,
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

      const request_list = [];

      for (const item of data) {
        const _user = await userService.getUserByUserId({
          user_id: item.user_id,
        });

        const _interested_tag = await userService.getInterestedTagByUserId({
          user_id: item.user_id,
        });

        if (_user === "") {
          return res.status(500).json({
            message: "User not found",
          });
        }

        let request_item = {
          party_id: item.party_id,
          user_id: item.user_id,
          display_name: _user.display_name,
          rating: 0.0,
          image_url: _user.image_url,
          status: item.status,
        };

        if (_interested_tag !== []) {
          request_item["interested_tag"] = _interested_tag[0].interest_tags.map(
            ({ dataValues: tag }) => {
              delete tag["users_interest_tags"];
              return tag;
            }
          );
        } else {
          request_item["interested_tag"] = [];
        }
        request_list.push(request_item);
      }

      return res.status(200).json({
        request: request_list,
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
        message: e.message || e,
      });
    }
  },

  getPartyByUserId: async (req, res) => {
    try {
      const party_raw_data_list = await partyService.getPartyByUserId({
        user_id: req.user,
      });

      if (party_raw_data_list.length <= 0) {
        return res.status(204).json();
      }

      const party_list = [];

      for (const party of party_raw_data_list) {
        // TODO: wait migrate timestamp field from string to datetime
        const _diff_time = moment(party.dataValues.archived_at).diff(
          moment().format(),
          "minutes"
        );
        if (_diff_time > 0) {
          const memberList = [];

          const head_party_raw_data = await userService.getUserByUserId({
            user_id: party.dataValues.head_party,
          });

          if (head_party_raw_data === "") {
            return res.status(500).json({
              message: "user not found",
            });
          }

          const restaurant_raw_data = party.dataValues.restaurants[0];

          for (const member of party.dataValues.members) {
            const user_raw_data = await userService.getUserByUserId({
              user_id: member.user_id,
            });

            if (user_raw_data === "") {
              return res.status(500).json({
                message: "User not found",
              });
            }

            const user_format_data = {
              user_id: member.user_id,
              provider: user_raw_data.provider,
              display_name: user_raw_data.display_name,
              email: user_raw_data.email,
              image_url: user_raw_data.image_url,
              username: user_raw_data.username,
            };

            memberList.push(user_format_data);
          }

          const head_party_format_data = {
            user_id: party.dataValues.head_party,
            provider: head_party_raw_data.provider,
            display_name: head_party_raw_data.display_name,
            email: head_party_raw_data.email,
            image_url: head_party_raw_data.image_url,
            username: head_party_raw_data.username,
          };

          const restaurant_format_data = {
            restaurant_name: restaurant_raw_data.restaurant_name,
            restaurant_photo_ref: restaurant_raw_data.restaurant_photo_ref,
          };

          const party_format_data = {
            party_id: party.party_id,
            party_name: party.dataValues.party_name,
            head_party: head_party_format_data,
            party_type: party.dataValues.party_type,
            interested_topic: party.dataValues.interested_topic,
            max_member: party.dataValues.max_member,
            schedule_time: party.dataValues.schedule_time,
            created_at: party.dataValues.created_at,
            updated_at: party.dataValues.updated_at,
            archived_at: party.dataValues.archived_at,
            members: memberList,
            interest_tags: party.dataValues.interest_tags,
            restaurant: restaurant_format_data,
            open_chat_link: party.dataValues.open_chat_link,
          };

          party_list.push(party_format_data);
        }
      }

      return res.status(200).json({
        parties: party_list,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: e.message || e,
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
  @body restaurant_photo_ref
  @body open_chat_link
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

      let open_chat_link = "";

      if (req.body.open_chat_link !== "") {
        open_chat_link = helper.urlify(req.body.open_chat_link);
      }

      const head_party_raw_data = await userService.getUserByUserId({
        user_id: head_party,
      });

      if (head_party_raw_data === "") {
        return res.status(500).json({
          message: "User not found",
        });
      }

      const _interest_tag = await partyService.findInterstTagById({
        tag_id: interest_tags,
      });

      if (!party_type) {
        return res.status(400).json({
          message: "party type cannot be null",
        });
      } else if (!helper.checkMatchEnum("PARTY_TYPE", party_type)) {
        return res.status(400).json({
          message: "party type is invalid",
        });
      }
      if (!party_name) {
        return res.status(400).json({
          message: "party name cannot be null",
        });
      }
      if (party_type === ENUM.PARTY_TYPE.PRIVATE && !passcode) {
        return res.status(400).json({
          message: "if party type is private passcode can not be null",
        });
      }
      if (!interested_topic) {
        return res.status(400).json({
          message: "interest topic can not be null",
        });
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
      if (
        open_chat_link === null ||
        open_chat_link.length > 1 ||
        open_chat_link === []
      ) {
        return res.status(400).json({
          message: "link invalid",
        });
      }

      const params = {
        key: process.env.GOOGLE_MAP_API_KEY,
        place_id: req.params.restaurant_id,
      };
      const party = await partyService.createParty({
        head_party: head_party,
        party_name: party_name,
        passcode: passcode,
        party_type: party_type,
        interested_topic: interested_topic,
        max_member: max_member,
        schedule_time: schedule_time,
        open_chat_link:
          open_chat_link[0] !== undefined ? open_chat_link[0].trim() : "",
        transaction: transaction,
      });
      const _restaurant = await restaurantService.findRestaurantByRestaurantId({
        restaurant_id: req.params.restaurant_id,
      });
      if (!_restaurant) {
        const restaurant = (
          await axios.get(
            "https://maps.googleapis.com/maps/api/place/details/json",
            { params }
          )
        ).data.result;
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

      if (party[0].members.length >= party[0].max_member) {
        return res.status(400).json({
          message: "Party Member Limit",
        });
      }
      if (
        party[0].party_type === ENUM.PARTY_TYPE.PRIVATE &&
        (req.body.passcode === null || req.body.passcode !== party[0].passcode)
      ) {
        res.status(400).json({ message: "Passcode incorrect" });
      }
      const ever_join = await partyService.requestJoinByUserId({
        party_id: party[0].party_id,
        user_id: req.user,
      });
      if (ever_join.length > 0) {
        return res
          .status(400)
          .json({ message: "You already request to join this party" });
      }
      const data = await partyService.joinParty({
        party_id: req.params.party_id,
        user_id: req.user,
        status: ENUM.REQUEST_STATUS.WAITING,
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
        message: e.message || e,
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
      console.log(e);
      return res.status(500).json({
        message: e.message || e,
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
          return res.status(500).json({
            message: "User not found",
          });
        }
        const member = await partyService.checkIsMemberParty({
          party_id: req.params.party_id,
          user_id: user.user_id,
        });
        if (member.length === 0) {
          return res.status(400).json({
            message: "Only member can assign to be party owner.",
          });
        }
      }
      if (req.body.party_type) {
        if (!helper.checkMatchEnum("PARTY_TYPE", req.body.party_type)) {
          return res.status(400).json({ message: "Party type invalid" });
        }
        if (
          req.body.party_type === ENUM.PARTY_TYPE.PRIVATE &&
          !req.body.passcode
        ) {
          return res.status(400).json({
            message: "Private party must have passcode",
          });
        }
      }

      if (req.body.open_chat_link === undefined) {
        return res.status(400).json({
          message: "link invalid",
        });
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
        open_chat_link: req.body.open_chat_link,
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
      console.log(e);
      return res.status(500).json({
        message: e.message || e,
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
        return res.status(400).json({
          message: "Party not found",
        });
      }
      if (party[0].head_party !== req.user) {
        return res.status(403).json({
          message: "Permission Denied",
        });
      }
      if (!helper.checkMatchEnum("REQUEST_STATUS", req.body.status)) {
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
        const find_user_in_party = await partyService.handleCheckMemberRequest({
          party_id: req.params.party_id,
          user_id: req.body.user_id,
        });

        if (find_user_in_party.length > 0) {
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
      console.log(e);
      await transaction.rollback();
      return res.status(500).json({
        message: e.message || e,
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

      const member_list = party[0].members.map((e) => e.user_id);

      if (member_list.includes(req.user)) {
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
      console.log(e);
      await transaction.rollback();
      return res.status(500).json({
        message: e.message || e,
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

      const member_list = party[0].members.map((e) => e.user_id);
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
      if (member_list.includes(user_id)) {
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
      console.log(e);
      await transaction.rollback();
      return res.status(500).json({
        message: e.message || e,
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

      const waiting_request_list = [];

      for (const request of data) {
        // TODO: wait migrate timestamp field from string to datetime
        const { party } = request;
        const _diff_time = moment(party.schedule_time).diff(
          moment().format(),
          "minutes"
        );
        if (_diff_time > 0) {
          if (party.restaurants.length < 1) {
            return res.status(500).json({
              message: "restaurant not found",
            });
          }

          const restaurant = party.restaurants[0];

          const head_party = await userService.getUserByUserId({
            user_id: party.head_party,
          });

          if (head_party === "") {
            return res.status(500).json({
              message: "user not found",
            });
          }

          const request_format_data = {
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
            restaurant: {
              restaurant_name: restaurant.restaurant_name,
              restaurant_photo_ref: restaurant.restaurant_photo_ref,
            },
            interest_tags: party.interest_tags,
          };

          waiting_request_list.push(request_format_data);
        }
      }
      // TODO: wait return 204 when empty

      return res.status(200).json({
        request_list: waiting_request_list,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: e.message || e,
      });
    }
  },

  getHistoryPartyJoined: async (req, res) => {
    try {
      const data = await partyService.getPartyHistoryByUser({
        user_id: req.user,
      });

      if (data.length === 0) {
        return res.status(204).json();
      }

      const history_format_data_list = [];

      for (const item of data) {
        const { party } = item;
        // TODO: wait migrate timestamp field from string to datetime
        const _diff_time = moment(party.archived_at).diff(
          moment().format(),
          "minutes"
        );
        if (_diff_time < 0) {
          if (party.restaurants.length < 1) {
            return res.status(500).json({
              message: "restaurant not found",
            });
          }

          const restaurant = party.restaurants[0];

          const head_party = await userService.getUserByUserId({
            user_id: party.head_party,
          });

          if (head_party === "") {
            return res.status(500).json({
              message: "user not found",
            });
          }

          const history_format_data = {
            party_id: party.party_id,
            party_name: party.party_name,
            head_party: {
              provider: head_party.provider,
              display_name: head_party.display_name,
              image_url: head_party.image_url,
              username: head_party.username,
            },
            interested_topic: party.interested_topic,
            schedule_time: party.schedule_time,
            archived_at: party.archived_at,
            status: item.status,
            restaurant: {
              restaurant_name: restaurant.restaurant_name,
              restaurant_photo_ref: restaurant.restaurant_photo_ref,
            },
            interest_tags: party.interest_tags,
            open_chat_link: party.open_chat_link,
          };

          history_format_data_list.push(history_format_data);
        }
      }

      // TODO: wait implement return 204 when empty

      return res.status(200).json({
        history: history_format_data_list,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: e.message || e,
      });
    }
  },

  quickJoin: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      if (!req.body || !req.body.lat || !req.body.lng) {
        return res.status(400).json({
          message: "bad request",
        });
      }
      const restaurant_list = await restaurantService.findAllRestaurant();
      const { lat, lng } = req.body;
      const position_list = [];
      const restaurant_map_position = {};
      const restaurant_sort_list = [];

      for (const restaurant of restaurant_list) {
        const _lat_diff = lat - restaurant.lat;
        const _lng_diff = lng - restaurant.lng;
        let _diff = _lat_diff / _lng_diff;
        if (_diff < 0) {
          _diff *= -1;
        }
        position_list.push(_diff);
        restaurant_map_position[restaurant.restaurant_id] = _diff;
      }

      position_list.sort();

      for (const position of position_list) {
        const _restaurant = helper.getKeyByValue(
          restaurant_map_position,
          position
        );
        restaurant_sort_list.push(_restaurant);
      }

      for (const restaurant of restaurant_sort_list) {
        const party_list = await partyService.quickJoinFindPartyByRestaurantId({
          restaurant_id: restaurant,
        });
        if (party_list.length === 0) {
          continue;
        }
        for (const party of party_list[0].parties) {
          const request_list = party.members.map((e) => e.user_id);
          if (
            !request_list.includes(req.user) &&
            party.max_member > party.members.length
          ) {
            const member_list = await partyService.getMemberListByPartyId({
              party_id: party.party_id,
            });
            const head_party = await userService.getUserByUserId({
              user_id: party.head_party,
            });
            delete head_party.user_id;
            const member_list_with_data = [];
            for (const user of member_list) {
              const user_data = await userService.getUserByUserId(user);
              if (user_data !== "") {
                delete user_data.user_id;
                member_list_with_data.push(user_data);
              }
            }
            const _restaurant = restaurant_list.find(
              (e) => e.restaurant_id === restaurant
            );
            await transaction.commit();
            return res.status(200).json({
              party_id: party.party_id,
              party_name: party.party_name,
              head_party: head_party,
              party_type: party.party_type,
              interested_topic: party.interested_topic,
              max_member: party.max_member,
              schedule_time: party.schedule_time,
              created_at: party.created_at,
              updated_at: party.updated_at,
              member_amount: member_list_with_data.length,
              interest_tags: party.interest_tags,
              restaurant: {
                restaurant_name: _restaurant.restaurant_name,
                restaurant_photo_ref: _restaurant.restaurant_photo_ref,
              },
            });
          }
        }
      }
      await transaction.rollback();
      return res.status(204).json();
    } catch (e) {
      await transaction.rollback();
      console.log(e);
      return res.status(500).json({
        message: e.message || e,
      });
    }
  },

  checkStatus: async (req, res) => {
    try {
      const data = await partyService.checkStatusByPartyIdAndUserId({
        party_id: req.body.party_id,
        user_id: req.user,
      });
      if (data.length === 0) {
        return res.status(204).json();
      }
      return res.status(200).json({
        status: data[0].status,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: e.message || e,
      });
    }
  },
};
