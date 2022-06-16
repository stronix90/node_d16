require("dotenv").config();

const ENV = {
    MONGO_CONN_STRING: process.env.MONGO_CONN_STRING,
    PERSISTENCIA: process.env.PERSISTENCIA,
};

module.exports = ENV;
