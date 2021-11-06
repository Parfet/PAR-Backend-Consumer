const userService = require("../services/users_service");

module.exports = {
  getUserByUserId: async (req, res) => {
    try {
      const user = await userService.getUserByUserId({
        user_id: req.user,
      });

      const _interest_tag_data = await userService.getInterestedTagByUserId({
        user_id: req.user,
      });

      if (
        _interest_tag_data !== [] &&
        _interest_tag_data[0].interest_tags !== []
      ) {
        return res.status(200).json({
          user: user,
          interested_tag: _interest_tag_data
            .map(({ dataValues: user_data }) => user_data)[0]
            .interest_tags.map(({ dataValues: tag }) => {
              delete tag["users_interest_tags"];
              return tag;
            }),
        });
      } else {
        return res.json({
          user: user,
          interested_tag: [],
        });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: e,
      });
    }
  },
  updateUserInfoByUserId: async (req, res) => {
    try {
      const { display_name, interested_tag } = req.body;

      if (display_name != null && display_name !== "") {
        await userService.updateUserInfoByUserId({
          user_id: req.user,
          display_name: display_name,
        });
      }
      if (interested_tag != null && interested_tag !== []) {
        if (!Array.isArray(interested_tag)) {
          return res.status(400).json({
            message: "interest_tag is invalid",
          });
        }
        for (const tag of interested_tag) {
          await userService.updateInterestedTagByUserId({
            user_id: req.user,
            interested_tag: tag,
          });
        }
      }
      return res.status(200).json();
    } catch (e) {
      return res.status(500).json({
        message: e.message || e,
      });
    }
  },
};
