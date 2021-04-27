const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

const partyModel = require("../../models/index").parties;

const findPartyAll = async () => partyModel.findAll();

const findPartyByPartyId = async ({ party_id }) => partyModel.findByPk(party_id);

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

module.exports = {
  findPartyAll,
  findPartyByPartyId,
  insertParty,
};
