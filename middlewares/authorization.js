const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
    // get token from cookies
    const {token} = req.cookies;
    if (!token) {
        return res.status(401).json({message: "You are not authorized to access this route"});
    }
    // verify if token is valid
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({message: "Wrong JWT"});
        }
        req.user = payload.id;
        next();
    });
};

module.exports = authorization;