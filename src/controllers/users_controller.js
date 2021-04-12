const models = require('../../models/index');

module.exports = {
  getAllUser: async (_req, res) => {
    try {
      const user = await models.users.findAll();
      res.json({
        users: user
      });
    } catch (e) {
      res.json({
        message: e,
      });
    }
  },
};
