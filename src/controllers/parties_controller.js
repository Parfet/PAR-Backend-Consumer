const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

const models = require("../../models/index");
const ENUM = require("../constants/enum");
const checkErrorService = require("../services/check_error");
const { BadRequest } = require("../utils/errors");

module.exports = {
  //
  // * [POST] create party
  // TODO: implement error if request invalid
  // TODO: wait jwt and check head party user id from jwt
  //
  createParty: async (req, res) => {
    try {
      // * check is owner is member of system
      const head_party = await models.users.findByPk(req.body.head_party);
      const message = [];
      // TODO: wait refactor to service method
      if (Object.keys(req.body).length !== 0) {
        if (!head_party) {
          message.push("Owner party invalid");
        }
        if (!req.body.party_type) {
          message.push("party type cannot be null");
        } else if (
          !checkErrorService.checkMatchEnum("PARTY_TYPE", req.body.party_type)
        ) {
          message.push("party type is invalid");
        }
        if (!req.body.party_name) {
          message.push("party name cannot be null");
        }
        if (
          req.body.party_type === ENUM.PARTY_TYPE.PRIVATE &&
          !req.body.passcode
        ) {
          message.push("if party type is private passcode can not be null");
        }
        if(!req.body.interested_topic){
            message.push("interest topic can not be null")
        }
        if(!req.body.interested_tag){
            message.push("interest tag can not be null")
        }
        if (req.body.max_member === undefined) {
          console.log(req.body.max_member);
          message.push("max maxber cannot be null");
        } else if (req.body.max_member < 1) {
          message.push("max member must be more than 0");
        }
        if (!req.body.schedule_time) {
          message.push("schedule time cannot be null");
        }

        if (message.length > 0) {
          throw new BadRequest([...message]);
        }
      } else {
        return res.status(400).json({
          message: "Invalid Request",
        });
      }

      const party = await models.parties.create({
        party_id: uuidv4(),
        head_party: req.body.head_party,
        party_name: req.body.party_name,
        passcode: req.body.passcode,
        party_type: req.body.party_type,
        interested_topic: req.body.interested_topic,
        interested_tag: req.body.interested_tag,
        max_member: req.body.max_member,
        schedule_time: req.body.schedule_time,
        created_at: moment().format(),
      });
      res.status(200).json({
        party: party.dataValues,
      });
    } catch (e) {
      res.status(400).json({
        message: e,
      });
      console.log(e);
    }
  },
};
