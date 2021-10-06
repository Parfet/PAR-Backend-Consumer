require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateJWTToken = ({ user_id, expiresIn }) => {
  const _access_token = jwt.assign(
    {
      id: user_id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: `${expiresIn}`,
    }
  );
  const _refresh_token = jwt.sign(
    {
      id: user_id,
    },
    process.env.REFRESH_TOKEN_SECRET
  );
  return {
    access_token: _access_token,
    refresh_token: _refresh_token,
  };
};


module.exports = {
    generateJWTToken,
}