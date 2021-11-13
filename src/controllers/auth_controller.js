const admin = require("../utils/firebase_admin");
const firestore = admin.firestore();
const userService = require("../services/users_service");

module.exports = {
  checkIsUserExisted: async (req, res) => {
    try {
      const document_ref = firestore.collection(`User`).doc(req.user);
      const document_list = await document_ref.get();

      if (document_list.data()) {
        return res.status(200).json({
          is_user_existed: true,
        });
      } else {
        return res.status(200).json({
          is_user_existed: false,
        });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  register: async (req, res) => {
    try {
      const {
        username,
        email,
        provider,
        display_name,
        first_name,
        last_name,
        image_url,
        accept_term_of_use,
        interested_tag,
      } = req.body;

      if (
        accept_term_of_use === false ||
        accept_term_of_use === undefined ||
        accept_term_of_use === null
      ) {
        return res.status(400).json({
          message: "accept my term of use for happy with my system :)",
        });
      }

      const user_collection = firestore.collection("User");

      const user_raw_data = await userService.getUserByUserId({
        user_id: req.user,
      });

      if (user_raw_data !== "") {
        return res.status(400).json({
          message: "you have already register.",
        });
      }

      const is_username_exist = await userService.checkIsExistFromCollection({
        user_id: req.user,
        field: "username",
        value: username,
      });

      if (is_username_exist) {
        return res.status(400).json({
          message: "username already use",
        });
      }

      const is_display_name_exist =
        await userService.checkIsExistFromCollection({
          user_id: req.user,
          field: "display_name",
          value: display_name,
        });

      if (is_display_name_exist) {
        return res.status(400).json({
          message: "display name already use",
        });
      }

      await user_collection.doc(req.user).set({
        username: username,
        email: email,
        provider: provider,
        display_name: display_name,
        first_name: first_name,
        last_name: last_name,
        image_url: image_url,
        accept_term_of_use: accept_term_of_use,
      });

      await userService.createUser({
        user_id: req.user,
      });

      if (interested_tag != null && interested_tag !== []) {
        for (const tag of interested_tag) {
          await userService.createInterestedTagMatchWithUserId({
            user_id: req.user,
            interested_tag: tag,
          });
        }
      }

      return res.status(204).json();
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err || err.message,
      });
    }
  },
};
