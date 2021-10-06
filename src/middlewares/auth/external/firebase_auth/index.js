const admin = require("../../../../utils/firebase_admin");
const ERROR = require("../../../../constants/errror");

const auth = admin.auth();

module.exports = {
  verifyAccessToken: async (req, res, next) => {
    try {
      const auth_header = req.headers["authorization"];
      const token = auth_header;
      if (process.env.NODE_ENV !== "test") {
        const user = await auth.verifyIdToken(token);

        req.user = user.uid;
      } else {
        req.user = req.headers["authorization"];
      }

      next();
    } catch (err) {
      if (err) {
        if (err.code === ERROR.FIREBASE.AUTH.ID_TOKEN_EXPIRED) {
          return res.status(500).json({
            message: "token is expire",
          });
        } else {
          return res.status(500).json({
            message: "invalid signature token",
          });
        }
      }
    }
  },
};
