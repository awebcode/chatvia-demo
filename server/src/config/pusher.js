const Pusher = require("pusher");
require("dotenv").config();

const pusher = new Pusher({
  appId:
    process.env.NODE_ENV === "production"
      ? process.env.PUSHER_ID_PROD
      : process.env.PUSHER_ID,
  key:
    process.env.NODE_ENV === "production"
      ? process.env.PUSHER_KEY_PROD
      : process.env.PUSHER_KEY,
  secret:
    process.env.NODE_ENV === "production"
      ? process.env.PUSHER_SECRET_PROD
      : process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

module.exports = pusher;
