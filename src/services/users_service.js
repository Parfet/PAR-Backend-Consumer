const models = require("../../models/index");
const userModel = models.users;
const admin = require("../utils/firebase_admin");
const firestore = admin.firestore();

const getUserByUserId = async ({ user_id }) => {
  const documentRef = firestore.collection("User").doc(user_id);
  const documentList = await documentRef.get();
  const data = documentList.data();
  data.user_id = user_id;
  return data;
};

const createUser = async ({ user_id }) =>
  userModel.create({
    user_id: user_id,
  });

module.exports = {
  getUserByUserId,
  createUser,
};
