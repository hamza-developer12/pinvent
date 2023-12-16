const bcrypt = require("bcryptjs")

const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    return hashedPassword;
}

const hashToken = async (resetToken) => {
    const hashedToken = await bcrypt.hash(resetToken, 10);

    return hashedToken;
}

const comparePassword = async (password, userPassword) => {
    const matchPassword = await bcrypt.compare(password, userPassword);
    return matchPassword;
}
module.exports = { hashPassword, comparePassword, hashToken }