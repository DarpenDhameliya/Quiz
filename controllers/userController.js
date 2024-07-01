const axios = require("axios");
const jwt = require("jsonwebtoken");
const {
  findUser,
  googleLogin,
  findUserById,
  updateUserWallet,
} = require("../db/auth");
const { errormessage, successmessage } = require("../response/response");
const JWT_SECRET = "skyline";
const bcrypt = require("bcrypt");

const getGoogleRegister = async (req, res) => {
  axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${req.headers.authorization}`,
      {
        headers: {
          Authorization: `Bearer ${req.headers.authorization}`,
          Accept: "application/json",
        },
      }
    )

    .then(async (response) => {
      const responce = await googleLogindb(response.data);
      if (responce.status === 200) {
        return res.status(200).json(successmessage(responce.message));
      } else {
        return res.status(responce.status).json(errormessage(responce.message));
      }
    })
    .catch((error) => {
      return res.status(500).json(errormessage(error.message));
    });
};

const googleLogindb = async (data) => {
  try {
    const findUserData = await findUser(data.email);

    if (findUserData.length === 0) {
      const salt = await bcrypt.genSalt(10);
      const encyptpassword = await bcrypt.hash(data.id, salt);
      const dbData = {
        password: encyptpassword,
        email: data.email,
      };
      try {
        const addUser = await googleLogin(dbData);
        const tknData = {
          id: addUser.insertId,
          email: data.email,
          type: "user",
        };
        const authToken = await jwt.sign(tknData, JWT_SECRET, {
          expiresIn: "24h",
        });
        return {
          status: 200,
          message: { token: authToken, email: data.email },
        };
      } catch (error) {
        return { status: 500, message: error.message };
      }
    } else {
      const tknData = {
        id: findUserData[0].id,
        email: findUserData[0].email,
        type: findUserData[0].type,
      };
      const authToken = await jwt.sign(tknData, JWT_SECRET, {
        expiresIn: "24h",
      });

      return {
        status: 200,
        message: { token: authToken, email: findUserData[0].email },
      };
    }
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

const Login = async (req, res) => {
  try {
    const { email, password, signup } = req.body;
    if (email && password) {
      const findUserData = await findUser(email);
      if (signup === true && findUserData.length > 0) {
        return res.status(402).json(errormessage("user Exist"));
      }

      if (signup === false && findUserData.length === 0) {
        return res.status(402).json(errormessage("user Not Exist"));
      }
      if (findUserData.length === 0) {
        const salt = await bcrypt.genSalt(10);
        const encyptpassword = await bcrypt.hash(password, salt);
        const dbData = {
          password: encyptpassword,
          email,
          type: req.path === "/ad-auth" ? "admin" : "user",
        };
        try {
          const addUser = await googleLogin(dbData);
          const tknData = {
            id: addUser.insertId,
            email: email,
            type: req.path === "/ad-auth" ? "admin" : "user",
          };
          const authToken = await jwt.sign(tknData, JWT_SECRET, {
            expiresIn: "24h",
          });
          return res
            .status(200)
            .json(successmessage({ token: authToken, email: email }));
        } catch (error) {
          return res.status(500).json(errormessage(error.message));
        }
      } else {
        const tknData = {
          id: findUserData[0].id,
          email: findUserData[0].email,
          type: findUserData[0].type,
        };
        const passwordCompare = await bcrypt.compare(
          password,
          findUserData[0].password
        );
        if (passwordCompare) {
          const authToken = await jwt.sign(tknData, JWT_SECRET, {
            expiresIn: "24h",
          });
          return res
            .status(200)
            .json(
              successmessage({ token: authToken, email: findUserData[0].email })
            );
        } else {
          return res.status(402).json(errormessage("Password Mismatch"));
        }
      }
    } else {
      return res.status(402).json(errormessage("Fields required"));
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(errormessage(error.message));
  }
};

const getUserWallet = async (req, res) => {
  try {
    const userWallet = await findUserById(req.user);
    return res.status(200).json(successmessage(userWallet[0]));
  } catch (error) {
    console.error("Error get quize:", error);
    return res.status(500).json(errormessage(error.message));
  }
};

const postUpdateUserWallet = async (req, res) => {
  try {
    const { type, wallet } = req.body;

    const userWallet = await findUserById(req.user);
    let updatedBalance;
    if (type === "add") {
      updatedBalance = userWallet[0].balance + parseInt(wallet);
    } else {
      updatedBalance = userWallet[0].balance - parseInt(wallet);
    }
    const data = { blance: updatedBalance, id: req.user };
    const response = await updateUserWallet(data);
    return res.status(200).json(successmessage("Wallet Update Successfully"));
  } catch (error) {
    console.error("Error get quize:", error);
    return res.status(400).json(errormessage(error.message));
  }
};

module.exports = {
  getGoogleRegister,
  postUpdateUserWallet,
  Login,
  getUserWallet,
};
