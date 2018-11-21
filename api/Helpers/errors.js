const errors = {

    catchError: (res, err) => {
        res.status(500).json({
            error: err
        })
    }

};
module.exports = errors;