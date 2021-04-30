const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

const models = require("../../models/index");
const partyModel = models.parties;
const userModel = models.users;
const userPartyModel = models.users_parties;
const restaurantModel = models.restaurants;
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
        attributes: {
          exclude: ["password"],
        },
        as: "members",
        through: {
          attributes: [],
          where: {
            status: {
              [Op.eq]: ENUM.REQUEST_STATUS.ACCEPT,
            },
          },
        },
      },
    },
  });
  return data;
};

const findPartyByPartyId = async ({ party_id }) =>
  partyModel.findAll({
    where: {
      party_id: party_id,
    },
    include: {
      model: userModel,
      as: "members",
      attributes: {
        exclude: ["password"],
      },
      through: {
        attributes: [],
        where: {
          status: {
            [Op.eq]: ENUM.REQUEST_STATUS.ACCEPT,
          },
        },
      },
    },
  });

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

const requestJoinList = async ({ party_id }) => {
  const data = await userPartyModel.findAll({
    attributes: {
      exclude: ["user_id", "party_id", "status"],
    },
    where: {
      party_id: party_id,
      // user_id: null,
      status: ENUM.REQUEST_STATUS.WATING,
    },
    include: {
      model: userModel,
      as: "user",
      attributes: ["user_id", "username", "image_url"],
    },
  });
  return data;
};

const requestJoinByUserId = async ({ party_id, user_id }) =>
  userPartyModel.findAll({
    attributes: {
      exclude: ["user_id", "party_id", "status"],
    },
    where: {
      party_id: party_id,
      user_id: user_id,
      status: {
        [Op.or]: [ENUM.REQUEST_STATUS.ACCEPT, ENUM.REQUEST_STATUS.WATING]
      },
    },
    include: {
      model: userModel,
      as: "user",
      attributes: ["user_id", "username", "image_url"],
    },
  });

const joinParty = async ({ party_id, user_id, status }) => {
  const data = await userPartyModel.create({
    user_id: user_id,
    party_id: party_id,
    status: status,
  });
  return data;
};

const archiveParty = async ({ party_id }) => {
  const data = await partyModel.update(
    {
      archived_at: moment(),
      updated_at: moment(),
    },
    {
      where: {
        party_id: party_id,
      },
    }
  );
  return data;
};

const updatePartyInfo = async ({
  party_name,
  head_party,
  passcode,
  party_type,
  interested_topic,
  interested_tag,
  max_member,
  schedule_time,
  archived_at,
}) => {
  console.log(party_name);
  const data = await partyModel.update(
    {
      party_name: party_name,
      head_party: head_party,
      passcode: passcode,
      party_type: party_type,
      interested_topic: interested_topic,
      interested_tag: interested_tag,
      max_member: max_member,
      schedule_time: schedule_time,
      archived_at: archived_at,
      updated_at: moment(),
    },
    {
      where: {
        party_id: "24e248e4-1f64-4f15-821b-24fbd81d6c0f",
      },
    }
  );
  return data;
};

const checkIsMemberParty = async ({ party_id, user_id }) => {
  const data = await partyModel.findAll({
    where: {
      party_id: party_id,
    },
    include: {
      model: userModel,
      as: "members",
      where: {
        user_id: user_id,
      },
      through: {
        attributes: ["status"],
        where: {
          status: {
            [Op.eq]: ENUM.REQUEST_STATUS.ACCEPT,
          },
        },
      },
    },
  });
  return data;
};

module.exports = {
  findPartyByRestaurantId,
  findPartyByPartyId,
  createParty,
  joinParty,
  requestJoinList,
  archiveParty,
  updatePartyInfo,
  checkIsMemberParty,
  requestJoinByUserId,
};
