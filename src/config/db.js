const ENV = require("./envVariables");

const db = {
    mongodb: {
        conn: ENV.MONGO_CONN_STRING,
        options: {
            useNewUrlParse: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            serverSelectionTimeoutMS: 5000,
        },
    },
};

module.exports = db;
