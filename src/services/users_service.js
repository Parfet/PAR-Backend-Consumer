const models = require("../../models/index");
const userModel = models.users;

const getAllUser = async () =>
  userModel.findAll({
    attributes: {
      exclude: ["password"],
    },
  });

const getUserByUserId = async ({ user_id }) => userModel.findByPk(user_id, {
  attributes:{
    exclude: ['password']
  }
});

module.exports = {
  getAllUser,
  getUserByUserId,
};
