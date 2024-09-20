const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  const headerObj = req.headers;
  console.log(headerObj);
  const token = headerObj?.authorization?.split(" ")[1];
  console.log(token);
  const verify = jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    console.log(decode);
    if (err) {
      return false;
    } else {
      return decode;
    }
  });
  if (verify) {
    req.user = verify.id;
    next();
  } else {
    const err = new Error("Token Expire Please Login Again");
    next(err);
  }
};

module.exports = isAuthenticated;
