const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const { dbConnectionString } = require("../constants/constants");

const dao = {
  ConnectToDB: function () {
    mongoose.connect(dbConnectionString);
    mongoose.connection.once("open", () => {
      console.log("[dao.js] connection open");
    });
  },
};

module.exports = {
  dao,
};
