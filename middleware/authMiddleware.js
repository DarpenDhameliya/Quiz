const jwt = require("jsonwebtoken");
const JWT_SECRET = "skyline";
const { errormessage } = require("../response/response");

const Authenticate = async (req, res, next) => {
    let token
    if ((req.header("Authorization"))) {
        token = req.header("Authorization").split(' ')[1];
    }
    if (!token) {
        return res.status(401).send(errormessage("Please Add token "));
    } else {
        try {
            var match_user = jwt.verify(token, JWT_SECRET);
            req.user = match_user.id
            req.type = match_user.type
            next();
        } catch (error) {
            res.status(401).send(errormessage("Token Mismatch"));
        }
    }
};

module.exports = Authenticate;