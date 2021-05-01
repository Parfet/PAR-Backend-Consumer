const restaurantModel = require("../../models/index").restaurants;
const restaurantAndPartyModel = require("../../models/index")
  .restaurants_parties;

const createParty = async ({ restaurant_id, party_id }) => {
  const data = await restaurantAndPartyModel.create({
    restaurant_id: restaurant_id,
    party_id: party_id,
  });
  return data;
};

const findAllRestaurant = async () => restaurantModel.findAll();

const findRestaurantByRestaurantId = async ({ restaurant_id }) => restaurantModel.findByPk(restaurant_id)
module.exports = {
  createParty,
  findAllRestaurant,
  findRestaurantByRestaurantId,
};
