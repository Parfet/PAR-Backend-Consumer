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
  getUserByUserId: async (req, res) => {
    try {
      console.log(req.params.user_id, 'test')
      const user = await userService.getUserByUserId({ user_id: req.params.user });
      
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
