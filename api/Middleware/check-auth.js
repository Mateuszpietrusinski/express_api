const JWT = require('jsonwebtoken');
const messagesHelper = require('../Helpers/messages');
module.exports = (res, req, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);
        req.userData = decoded;
        next();
    }
    catch (e) {
        return messagesHelper.stringResponseMessage(res, 401, 'Auth failed');
    }
};