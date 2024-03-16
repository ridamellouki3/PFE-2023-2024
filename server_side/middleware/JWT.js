const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  if (req.user) {
    req.userId = req.user._id;
    req.role = req.user.role;
    return next();
  } else {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).json("You are not authenticated!");
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
      if (err) {
        return res.status(403).json(err.message);
      }
      req.userId = payload.id;
      req.role = payload.role;
      next();
    });
  }
};

module.exports = verifyToken;
