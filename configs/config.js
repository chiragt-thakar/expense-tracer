const env = require("dotenv");
env.config();

module.exports = {
  env: env.NODE_ENV,
  mongoose: {
    db: process.env.DB,
    url: process.env.MONGOOSEURL,
    dbUser: process.env.DBUSERNAME,
    dbUserPassword: process.env.DBPASSWORD,
  },
  jwtSecret: process.env.JWTSECRET,
  accessExpireTime: process.env.ACCESSEXPIRETIME,
  refreshExpireTime: process.env.REFRESHEXPIRETIME,
};
