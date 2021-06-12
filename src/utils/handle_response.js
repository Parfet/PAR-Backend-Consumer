const userService = require('../services/users_service')

const handleRestaurantPartyResponse = async (data)  => {
    const partyList = data;
    const users = {}
    for(const party of partyList) {
        users[party.head_party] = await userService.getUserByUserId({user_id: party.head_party})
    }
    for(const party of partyList){
        party.dataValues.head_party = users[party.head_party]
    }
    return partyList
}

module.exports = {
    handleRestaurantPartyResponse
}