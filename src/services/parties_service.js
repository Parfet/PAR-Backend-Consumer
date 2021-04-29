const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

const models = require("../../models/index");
const partyModel = require("../../models/index").parties;
const userModel = require("../../models/index").users;
const userPartyModel = require("../../models/index").users_parties;
const restaurantModel = require("../../models/index").restaurants;
const ENUM = require("../constants/enum");
const { Op } = require("sequelize");

const findPartyByRestaurantId = async ({ restaurant_id }) => {
  const data = restaurantModel.findAll({
    where: {
      restaurant_id: restaurant_id,
    },
    include: {
      model: partyModel,
      where: {
        archived_at: null,
      },
      through: {
        attributes: [],
      },
      include: {
        model: userModel,
        as: "members",
        through: {
          attributes: [],
          where: {
            status: {
              [Op.eq]: ENUM.REQUEST_STATUS.ACCEPT
            }
          }
        },
      },
    },
  });
  return data;
};

const findPartyByPartyId = async ({ party_id }) =>
  partyModel.findByPk(party_id);

const createParty = async ({
  head_party,
  party_name,
  passcode,
  party_type,
  interested_topic,
  interested_tag,
  max_member,
  schedule_time,
}) => {
  const data = await partyModel.create({
    party_id: uuidv4(),
    head_party: head_party,
    party_name: party_name,
    passcode: passcode,
    party_type: party_type,
    interested_topic: interested_topic,
    interested_tag: interested_tag,
    max_member: max_member,
    member: [],
    schedule_time: schedule_time,
    created_at: moment().format(),
  });

  return data;
};

const checkRequestJoinList = async ({ party_id }) => {
  const data = await userPartyModel.findAll({
    where: {
      party_id: party_id,
    },
  });
  return data;
};

const joinParty = async ({ party_id, user_id, status }) => {
  const data = await userPartyModel.create({
    user_id: user_id,
    party_id: party_id,
    status: status,
  });
  return data;
};

const archiveParty = async ({ party_id, archived_at }) => {
  const data = await partyModel.update(
    {
      archived_at: archived_at,
    },
    {
      where: {
        party_id: party_id,
      },
    }
  );
  return data;
};

module.exports = {
  findPartyByRestaurantId,
  findPartyByPartyId,
  createParty,
  joinParty,
  checkRequestJoinList,
  archiveParty,
};
