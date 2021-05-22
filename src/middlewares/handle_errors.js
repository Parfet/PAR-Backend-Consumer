const { GeneralError, NotFound, BadRequest } = require('../utils/errors');

const handleError = (err, _req, res, _next) => {
    if( err instanceof GeneralError) {
        return res.status(err.getCode()).json({
            message: err.message
        })
    }

    if( err instanceof NotFound ) {
        return res.status(err.getCode()).json({
            message: err.message
        })
    }

    if( err instanceof BadRequest ) {
        return res.status(err.getCode()).json({
            message: err.message
        })
    }

    return res.status(500).json({
        message: err.message
    })
}

module.exports = handleError;