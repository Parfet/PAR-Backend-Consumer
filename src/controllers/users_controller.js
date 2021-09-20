const userService = require("../services/users_service");

module.exports = {
  getUserByUserId: async (req, res) => {
    try {
      const user = await userService.getUserByUserId({
        user_id: req.user,
      });

      return res.json({
        user: user,
      });
    } catch (e) {
      return res.status(500).json({
        message: e,
      });
    }
  },
};
