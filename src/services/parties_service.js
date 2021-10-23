const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

const models = require("../../models/index");
const partyModel = models.parties;
const userModel = models.users;
const userPartyModel = models.users_parties;
const restaurantModel = models.restaurants;
const ratingUserModel = models.rating_users;
const interestTagModel = models.interest_tags;
const restaurantsPartiesModel = models.restaurants_parties;
const ENUM = require("../constants/enum");
const { Op } = require("sequelize");
const handle = require("../utils/handle_response");

const deletePartyById = async ({ party_id }) =>
  partyModel.delete({
    where: {
      party_id: party_id,
    },
  });

const findPartyByRestaurantId = async ({ restaurant_id }) => {
  const data = await restaurantModel.findAll({
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
      include: [
        {
          model: userModel,
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
        {
          model: interestTagModel,
          as: "interest_tags",
          attributes: [
            ["tag_id", "value"],
            ["tag_name", "label"],
          ],
          through: {
            attributes: [],
          },
        },
      ],
    },
  });
  return data.map(({ dataValues: restaurant }) => restaurant);
};

const quickJoinFindPartyByRestaurantId = async ({ restaurant_id }) => {
  const data = await restaurantModel.findAll({
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
      include: [
        {
          model: userModel,
          as: "members",
          through: {
            attributes: [],
          },
        },
        {
          model: interestTagModel,
          as: "interest_tags",
          attributes: [
            ["tag_id", "value"],
            ["tag_name", "label"],
          ],
          through: {
            attributes: [],
          },
        },
      ],
    },
  });
  return data.map(({ dataValues: restaurant }) => restaurant);
};

const getMemberListByPartyId = async ({ party_id }) => {
  const data = await userPartyModel.findAll({
    where: {
      party_id: party_id,
      status: ENUM.REQUEST_STATUS.ACCEPT,
    },
    attributes: ['user_id']
  });
  return data.map(({ dataValues: request }) => request);
};

const findPartyByPartyId = async ({ party_id }) =>
  partyModel.findAll({
    where: {
      party_id: party_id,
    },
    include: [
      // TODO: change to user on firebase auth
      {
        model: userModel,
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
      {
        model: interestTagModel,
        as: "interest_tags",
        attributes: [
          ["tag_id", "value"],
          ["tag_name", "label"],
        ],
        through: {
          attributes: [],
        },
      },
    ],
  });

const createParty = async ({
  head_party,
  party_name,
  passcode,
  party_type,
  interested_topic,
  max_member,
  schedule_time,
  transaction,
}) =>
  partyModel.create(
    {
      party_id: uuidv4(),
      head_party: head_party,
      party_name: party_name,
      passcode: passcode,
      party_type: party_type,
      interested_topic: interested_topic,
      max_member: max_member,
      schedule_time: schedule_time,
      created_at: moment().format(),
    },
    {
      transaction: transaction,
    }
  );

const requestJoinList = async ({ party_id }) => {
  const data = await userPartyModel.findAll({
    attributes: {
      include: ["user_id", "party_id", "status"],
    },
    where: {
      party_id: party_id,
      status: ENUM.REQUEST_STATUS.WAITING,
    },
  });

  // TODO: rating of user
  const rate = await ratingUserModel.findAll();

  // data.map((e, _i) => {
  //   let rating = [];
  //   let finalRate = 0;

  //   for (let element of rate) {
  //     if (e.user.user_id === element.receive_rate_user_id) {
  //       rating.push(element.rating);
  //     }
  //   }
  //   rating.forEach((tempRate, _k) => {
  //     finalRate = parseFloat(finalRate) + parseFloat(tempRate);
  //   });
  //   e.user.dataValues.rating = parseFloat(finalRate / rating.length).toFixed(2);
  // });

  // data.map((e, _) => {
  //   e.dataValues = e.dataValues.user.dataValues;
  // });
  return data;
};

const requestJoinByUserId = async ({ party_id, user_id }) =>
  userPartyModel.findAll({
    attributes: {
      include: ["user_id", "party_id", "status"],
    },
    where: {
      party_id: party_id,
      user_id: user_id,
      status: {
        [Op.or]: [ENUM.REQUEST_STATUS.ACCEPT, ENUM.REQUEST_STATUS.WAITING],
      },
    },
    // TODO: change to user in firebase auth
    // include: {
    //   model: userModel,
    //   as: "user",
    //   attributes: ["user_id"],
    // },
  });

const joinParty = async ({ party_id, user_id, status, transaction }) =>
  userPartyModel.create(
    {
      user_id: user_id,
      party_id: party_id,
      status: status,
    },
    {
      transaction: transaction,
    }
  );

const archiveParty = async ({ party_id }) =>
  partyModel.update(
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

const updatePartyInfo = async ({
  party_id,
  party_name,
  head_party,
  passcode,
  party_type,
  interested_topic,
  interested_tag,
  max_member,
  schedule_time,
  archived_at,
}) =>
  partyModel.update(
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
        party_id: party_id,
      },
    }
  );

const checkIsMemberParty = async ({ party_id, user_id }) =>
  partyModel.findAll({
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

const handleMemberRequest = async ({
  status,
  user_id,
  party_id,
  transaction,
}) =>
  userPartyModel.update(
    {
      status: status,
    },
    {
      where: {
        user_id: user_id,
        party_id: party_id,
      },
    },
    {
      transaction: transaction,
    }
  );

const handleCheckMemberRequest = async ({ party_id, user_id }) =>
  userPartyModel.findAll({
    where: {
      party_id: party_id,
      user_id: user_id,
      status: {
        [Op.or]: [ENUM.REQUEST_STATUS.ACCEPT, ENUM.REQUEST_STATUS.DECLINE],
      },
    },
  });

const getInterestTag = async () =>
  interestTagModel.findAll({
    attributes: [
      ["tag_id", "value"],
      ["tag_name", "label"],
    ],
  });

const findInterstTagById = async ({ tag_id }) =>
  interestTagModel.findAll({
    where: {
      tag_id: {
        [Op.or]: tag_id,
      },
    },
  });

const getPartyByUserId = async ({ user_id }) => {
  const data = await userPartyModel.findAll({
    attributes: [],
    where: {
      user_id: user_id,
      status: ENUM.REQUEST_STATUS.ACCEPT,
    },
    include: {
      model: partyModel,
      where: {
        archived_at: null,
      },
      include: [
        {
          model: userModel,
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
        {
          model: interestTagModel,
          as: "interest_tags",
          attributes: [
            ["tag_id", "value"],
            ["tag_name", "label"],
          ],
          through: {
            attributes: [],
          },
        },
        {
          model: restaurantModel,
          attribute: ["restaurant_name", "restaurant_photo_ref"],
          through: {
            attributes: [],
          },
        },
      ],
    },
  });
  const partyTempArr = [];
  data.forEach((e) => {
    partyTempArr.push(e.dataValues.party.dataValues);
  });
  for (let i = 0; i < data.length; i++) {
    data[i].dataValues = partyTempArr[i];
  }

  return data;
};

const waitingRequestJoinByUserId = async ({ user_id }) => {
  const data = await userPartyModel.findAll({
    where: {
      user_id: user_id,
      status: ENUM.REQUEST_STATUS.WAITING,
    },
    include: {
      model: partyModel,
      where: {
        archived_at: null,
      },
      attributes: {
        exclude: ["archived_at", "updated_at", "passcode", "party_type"],
      },
      include: [
        {
          model: restaurantModel,
        },
        {
          model: interestTagModel,
          as: "interest_tags",
        },
      ],
    },
  });
  return data.map(({ dataValues: request }) => {
    return request;
  });
};

const removePartyMember = async ({ party_id, user_id, transaction }) =>
  userPartyModel.destroy(
    {
      where: {
        [Op.and]: [{ user_id: user_id }, { party_id: party_id }],
      },
    },
    {
      transaction: transaction,
    }
  );

const getPartyHistoryByUser = async ({ user_id }) => {
  const data = await userPartyModel.findAll({
    where: {
      user_id: user_id,
      status: ENUM.REQUEST_STATUS.ACCEPT,
    },
    include: {
      model: partyModel,
      where: {
        archived_at: {
          [Op.ne]: null,
        },
      },
      attributes: {
        exclude: ["updated_at", "passcode"],
      },
      include: [
        {
          model: restaurantModel,
        },
        {
          model: interestTagModel,
          as: "interest_tags",
        },
      ],
    },
  });
  return data.map(({ dataValues: request }) => {
    return request;
  });
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
  handleMemberRequest,
  handleCheckMemberRequest,
  deletePartyById,
  getInterestTag,
  findInterstTagById,
  getPartyByUserId,
  removePartyMember,
  waitingRequestJoinByUserId,
  getPartyHistoryByUser,
  quickJoinFindPartyByRestaurantId,
  getMemberListByPartyId,
};
