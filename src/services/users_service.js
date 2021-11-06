const models = require("../../models/index");
const userModel = models.users;
const userInterestTagModel = models.users_interest_tags;
const admin = require("../utils/firebase_admin");
const firestore = admin.firestore();

const createUser = async ({ user_id }) =>
  userModel.create({
    user_id: user_id,
  });

const getUserByUserId = async ({ user_id }) => {
  const documentRef = firestore.collection("User").doc(user_id);
  const documentList = await documentRef.get();
  const data = documentList.data();
  if (data) {
    return {
      user_id: user_id,
      provider: data.provider,
      display_name: data.display_name,
      email: data.email,
      last_name: data.last_name,
      image_url: data.image_url,
      first_name: data.first_name,
      username: data.username,
    };
  } else {
    return "";
  }
};

const createUser = async ({ user_id }) =>
  userModel.create({
const createInterestedTagMatchWithUserId = async ({
  user_id,
  interested_tag,
}) => {
  await userInterestTagModel.create({
    user_id: user_id,
    tag_id: interested_tag,
  });
};

  });

module.exports = {
  getUserByUserId,
  createUser,
};
