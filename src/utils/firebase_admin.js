const admin = require("firebase-admin");
const config = require("../constants/config");
const serviceAccount = require("../../parfet-b95d3-firebase-adminsdk-buimr-24e9eb8f45.json");

module.exports = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  serviceAccountId: config.firebaseConfig.messagingSenderId,
  storageBucket: config.firebaseConfig.storageBucket,
});
