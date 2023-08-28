const jwt = require('jsonwebtoken');

function checkAuth(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token, "token")
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decodedToken;
        console.log(decodedToken, "decoded token.")
        console.log(req, "decoded token.")
        next();
    } catch (error) {
        return res.status(401).json({
            "message":"Invalid or expired json token provided!",
            "error": error
        });
    }
}

module.exports = {
    checkAuth: checkAuth
}