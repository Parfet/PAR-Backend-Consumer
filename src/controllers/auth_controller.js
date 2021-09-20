const admin = require("../utils/firebase_admin");
const firestore = admin.firestore();
const userService = require("../services/users_service");

module.exports = {
  checkIsUserExisted: async (req, res) => {
    try {
      const documentRef = firestore.collection(`User`).doc(req.user);
      const documentList = await documentRef.get();
      console.log(documentList);
      if (documentList.data()) {
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
      } = req.body;

      const userCollection = firestore.collection("User");
      const userSnap = await userCollection.listDocuments();

      for (let user in userSnap) {
        if (user.id === req.user) {
          return res.status(400).json({
            message: "you have already register.",
          });
        }
      }

      await userCollection.doc(req.user).set({
        username: username,
        email: email,
        provider: provider,
        display_name: display_name,
        first_name: first_name,
        last_name: last_name,
        image_url: image_url,
      });

      await userService.createUser({
        user_id: req.user,
      });

      return res.status(204).json();
    } catch (err) {
      return res.status(500).json({
        message: err || err.message,
      });
    }
  },
};
