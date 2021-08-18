const admin = require("../utils/firebase_admin");
const firestore = admin.firestore();

module.exports = {
  checkIsUserExisted: async (req, res) => {
    try {
      const documentRef = firestore.collection(`User`).doc(req.user);
      const documentList = await documentRef.get();
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
};
