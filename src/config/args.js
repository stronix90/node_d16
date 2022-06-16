const parseArgs = require("minimist");

const options = {
    default: { port: 8080, modo:"fork" },
    alias: { p: "port", m:"modo" },
};

const { port, modo } = parseArgs(process.argv.slice(2), options);

module.exports = { port, modo };
