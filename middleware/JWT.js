const jwt = require("jsonwebtoken");

const verifyToken = (req, res,next) => {
  const token = req.cookies.accessToken;
  if (!token){ return res.status(401).json("You are not authenticated!")}

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {return res.status(403).json("Token is not valid!")}
    req.userId = payload.id;
    req.role = payload.role;
    next();
  });
};

module.exports = verifyToken