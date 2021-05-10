const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

const models = require("../../models/index");
const partyModel = models.parties;
const userModel = models.users;
const userPartyModel = models.users_parties;
const restaurantModel = models.restaurants;
const ratingUserModel = models.rating_users;
const interestTagModel = models.interest_tags;
const partiesInterestTagModel = models.parties_interest_tags;
const ENUM = require("../constants/enum");
const { Op } = require("sequelize");

const deletePartyById = async ({ party_id }) => partyModel.delete({
  where: {
    party_id: party_id,
  }
})

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
      include: [
        {
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
        {
          model: interestTagModel,
          as: "interest_tags",
          attributes: [["tag_id", "value"], ["tag_name", "label"]],
          through: {
            attributes: [],
          }
        },
      ],
    },
  });
  return data;
};

const findPartyByPartyId = async ({ party_id }) =>
  partyModel.findAll({
    where: {
      party_id: party_id,
    },
    include: [
      {
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
      {
        model: interestTagModel,
        as: "interest_tags",
        attributes: [["tag_id", "value"], "tag_name", "label"],
        through: {
          attributes: [],
        }
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
}) => {
  const data = await partyModel.create({
    party_id: uuidv4(),
    head_party: head_party,
    party_name: party_name,
    passcode: passcode,
    party_type: party_type,
    interested_topic: interested_topic,
    max_member: max_member,
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
      status: ENUM.REQUEST_STATUS.WATING,
    },
    include: {
      model: userModel,
      as: "user",
      attributes: ["user_id", "username", "image_url"],
    },
  });
  const rate = await ratingUserModel.findAll();

  data.map((e, _i) => {
    let rating = [];
    let finalRate = 0;
    for (let j = 0; j < rate.length; j++) {
      if (e.user.user_id === rate[j].receive_rate_user_id) {
        rating.push(rate[j].rating);
      }
    }
    rating.forEach((tempRate, _k) => {
      finalRate = parseFloat(finalRate) + parseFloat(tempRate);
    });
    e.user.dataValues.rating = parseFloat(finalRate / rating.length).toFixed(2);
  });

  data.map((e, _) => {
    e.dataValues = e.dataValues.user.dataValues;
  });
  return data;
};

const requestJoinByUserId = async ({ party_id, user_id }) => {
  const data = await userPartyModel.findAll({
    attributes: {
      exclude: ["user_id", "party_id", "status"],
    },
    where: {
      party_id: party_id,
      user_id: user_id,
      status: {
        [Op.or]: [ENUM.REQUEST_STATUS.ACCEPT, ENUM.REQUEST_STATUS.WATING],
      },
    },
    include: {
      model: userModel,
      as: "user",
      attributes: ["user_id"],
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
        party_id: party_id,
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

const handleMemberRequest = async ({ status, user_id }) => {
  const data = await userPartyModel.update(
    {
      status: status,
    },
    {
      where: {
        user_id: user_id,
      },
    }
  );

  return data;
};

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

const getInterestTag = async () => interestTagModel.findAll({
  attributes: [["tag_id", "value"], ["tag_name", "label"]],
});

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
};
