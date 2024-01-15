const jwt = require("jsonwebtoken");
const tokenConfig = require("../config/token");

exports.verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers.authorization;

  if (token.startsWith("Bearer")) {
    const newToken = token.replace("Bearer ", "");
    console.log("newtoken", newToken);

    jwt.verify(newToken, tokenConfig.SECRET, (err, decoded) => {
     
      if (err) {
        console.error(err.toString());

        return res
          .status(401)
          .send({ error: true, "message:": "Unauthorized User.", newToken });
      }
      req.decoded = decoded;

      next();
    });
  } else {
    return res.status(403).send({
      error: true,
      "message:": "No token provided.",
    });
  }
};
