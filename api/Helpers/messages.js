const messages = {

    stringResponseMessage: (res, status, message) => {
        /**
         * @param res (type: Object)
         * @param status (type: Number)
         * @param message (type: String)
         *
         * res - response from api endpoint
         * status - status of response
         * message - message to display in response
         */
        res.status(status).json({
            Message: message
        })
    },

    stringResponseMessageAndData: (res, status, message, data) => {
        /**
         * @param res (type: Object)
         * @param status (type: Number)
         * @param message (type: String)
         * @param data (type: Array)
         *
         * res - response from api endpoint
         * status - status of response
         * message - message to display in response
         * data - data to display in response
         */
        res.status(status).json({
            Message: message,
            Data: data
        })
    }
};
module.exports = messages;