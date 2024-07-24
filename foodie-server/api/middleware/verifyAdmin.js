const User = require('../models/User');

const verifyAdmin = async (req, res, next) => {
  try {
    const email = req.decoded.email;
    const query = { email: email };
    
    const user = await User.findOne(query);
    const isAdmin = user?.role === 'admin';

    if (!isAdmin) {
      console.log("User is not admin");
      return res.status(403).send({ message: "Forbidden access!" });
    }

    next();
  } catch (error) {
    console.error("Error in verifyAdmin middleware: ", error);
    return res.status(500).send({ message: "Server error" });
  }
};

module.exports = verifyAdmin;
