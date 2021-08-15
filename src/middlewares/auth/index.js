require("dotenv").config();
const jwt = require("jsonwebtoken");

const requestToken = (req, res, next) => {
  const accessToken = jwt.sign(
    {
      id: req.body.user_id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );
  const _refreshToken = jwt.sign(
    {
      id: req.body.user_id,
    },
    process.env.REFRESH_TOKEN_SECRET
  );
  return res.status(200).json({
    access_token: accessToken,
    refresh_token: _refreshToken,
  });
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null)
    return res.status(400).json({
      message: "Token invalid",
    });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err)
      return res.status(400).json({
        message: err.message,
      });

    req.user = user.id;

    next();
  });
};

const refreshToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) {
    return res.status(400).json({
      message: "Token invalid",
    });
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err)
      return res.status(400).json({
        message: err.message,
      });
    const accessToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );
    const _refreshToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.REFRESH_TOKEN_SECRET
    );
    return res.status(200).json({
      access_token: accessToken,
      refresh_token: _refreshToken,
    });
  });
};

module.exports = {
  requestToken,
  verifyToken,
  refreshToken,
};
