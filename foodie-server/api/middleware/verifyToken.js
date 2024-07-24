const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  console.log("Headers: ", req.headers.authorization);
  if (!req.headers.authorization) {
    console.log("No authorization header");
    return res.status(401).send({ message: "Unauthorized access" });
  }
  const token = req.headers.authorization.split(' ')[1];
  console.log("Token: ", token);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log("Token verification failed: ", err);
      return res.status(401).send({ message: "Token is invalid!" });
    }
    req.decoded = decoded;
    next();
  });
};

module.exports = verifyToken;
