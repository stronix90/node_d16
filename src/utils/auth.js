const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPass = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
};

const checkPass = async (password, encryptedPass) => {
    const res = await bcrypt.compare(password, encryptedPass);
    return res
};

module.exports = { hashPass, checkPass };
