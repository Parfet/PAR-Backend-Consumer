const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

const models = require('../../models/index');
const ENUM = require('../constants/enum')

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
            if(!head_party){
                res.status(400).json({
                    message: 'Owner party invalid'
                })
            }
            const party = await models.parties.create({
                party_id: uuidv4(),
                head_party: req.body.head_party,
                party_name: req.body.party_name,
                passcode: req.body.passcode,
                party_type: ENUM.PARTY_TYPE.PRIVATE,
                max_member: req.body.max_member,
                schedule_time: req.body.schedule_time,
                created_at: moment().format(),
            })
            res.status(200).json({
                party: party.dataValues
            })
        } catch (e) {
            res.status(400).json({
                message: e
            })
            console.log(e)
        }
    }
}