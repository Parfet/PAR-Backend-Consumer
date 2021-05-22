const userService = require("../services/users_service");

module.exports = {
  getAllUser: async (_req, res) => {
    try {
      const user = await userService.getAllUser();
      res.json({
        users: user,
      });
    } catch (e) {
      res.json({
        message: e,
      });
    }
  },
};
