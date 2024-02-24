const { MongoClient } = require("mongodb");
require("dotenv").config()
let dbConnection;

module.exports = {
  connection: (cb) => {
    MongoClient.connect(process.env.DBURL)
      .then((client) => {
        dbConnection = client.db();
        return cb();
      })
      .catch((err) => {
        console.log(err);
        return cb(err);
      });
  },
};
