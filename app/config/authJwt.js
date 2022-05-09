const jwt = require("jsonwebtoken");
const env = require("./env");

verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
if(typeof token !=='undefined'){
  const bearer = token.split(' ');
  const bearerToken =  bearer[1];
  req.token=bearerToken;
  next();
}else{
  return res.status(401).send({
    message: "Unauthorized!"
  });
}
  

  // jwt.verify(token, env.secretkey, (err, decoded) => {
  //   if (err) {
  //     return res.status(401).send({
  //       message: "Unauthorized!"
  //     });
  //   }
  //   req.userId = decoded.id;
  //   next();
  // });
};

const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;
