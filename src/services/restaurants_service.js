const models = require("../../models/index");
const restaurantModel = models.restaurants;
const restaurantAndPartyModel = models.restaurants_parties;
const promotionModel = models.promotions;

const createParty = async ({ restaurant_id, party_id, transaction }) =>
  restaurantAndPartyModel.create(
    {
      restaurant_id: restaurant_id,
      party_id: party_id,
    },
    {
      transaction: transaction,
    }
  );

const findAllRestaurant = async ({ query }) =>
  restaurantModel.findAll({
    where: query,
    include: {
      model: promotionModel,
      as: "promotions",
      through: {
        attributes: [],
      },
    },
  });

const findRestaurantByRestaurantId = async ({ restaurant_id }) =>
  restaurantModel.findByPk(restaurant_id);

module.exports = {
  createParty,
  findAllRestaurant,
  findRestaurantByRestaurantId,
};
