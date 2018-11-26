const errors = {

    catchError: (res, err) => {

        /**
         * @param res (type: Object)
         * @param err (type: Object)
         *
         * res - response from api endpoint
         * err - error message from callback function
         */

        res.status(500).json({
            error: err
        })
    },

    errorWithMessage(res, err, message){

        /**
         * @param res (type: Object)
         * @param err (type: Object)
         * @param message (type: String)
         *
         * res - response from api endpoint
         * err - error message from callback function
         * message - Message to display for a user in response
         */

         res.status(500).json({
            Message: message,
            Error: err
        })
    }

};
module.exports = errors;