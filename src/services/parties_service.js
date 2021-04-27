const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

const partyModel = require("../../models/index").parties;
const userPartyModel = require("../../models/index").users_parties;
const ENUM = require("../constants/enum");

const findPartyAll = async () => partyModel.findAll();

const findPartyByPartyId = async ({ party_id }) =>
  partyModel.findByPk(party_id);

const insertParty = async ({
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
      party_id: party_id
    }
  });
  return data;
};

const joinParty = async ({ party_id, user_id }) => {
  const data = await userPartyModel.create({
    user_id: user_id,
    party_id: party_id,
    status: ENUM.REQUEST_STATUS.WATING,
  });
  return data;
};

module.exports = {
  findPartyAll,
  findPartyByPartyId,
  insertParty,
  joinParty,
  checkRequestJoinList
};
