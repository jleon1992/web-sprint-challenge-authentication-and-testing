const jwt = require("jsonwebtoken");

const constants = require("../config/constants.js");

module.exports = (req, res, next) => {
    // add code here to verify users are logged in
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, constants.jwtSecret, (error, decodedToken) => {
            if (error) {
                // token not valid or was modified
                res.status(401).json({ message: "No token or incorrect token" });
            } else {

                req.decodedToken = decodedToken;

                next();
            }
        });
    } else {
        res.status(401).json({ message: "Please provide credentials" });
    }
};
