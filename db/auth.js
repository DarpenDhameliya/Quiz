const { queryPromise } = require('./query');


const findUserByMobileNumber = async (number) => {
    const selectategoryData = `SELECT * FROM users WHERE mobileNumber = ?`;
    const result = await queryPromise(selectategoryData, number);
    return result;
};

const otpLogin = async (data) => {
    const selectategoryData = `INSERT INTO users SET ?`;
    const result = await queryPromise(selectategoryData, data);
    return result;
};

const findUser = async (email) => {
    const selectategoryData = `SELECT * FROM users WHERE email = ?`;
    const result = await queryPromise(selectategoryData, email);
    return result;
};

const findUserById = async (id) => {
    // console.log(id)
    const selectategoryData = `SELECT balance FROM users WHERE id = ?`;
    const result = await queryPromise(selectategoryData, id);
    return result;
};

const googleLogin = async (data) => {
    const selectategoryData = `INSERT INTO users SET ?`;
    const result = await queryPromise(selectategoryData, data);
    return result;
};

const updateUserWallet = async (data) => {
    const { blance, id } = data
    // console.log(blance, id)
    const selectategoryData = `UPDATE users SET balance = ? WHERE id = ?`;
    const result = await queryPromise(selectategoryData,[blance, id]);
    return result;
};


module.exports = {
    googleLogin,
    findUser,
    findUserByMobileNumber,
    otpLogin,
    updateUserWallet,
    findUserById
};