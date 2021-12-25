const output = {};

output.sendErrorResponse = (req, res, options = { statusCode: 500, error: null, message: null }) => {
    const { statusCode, error, message } = options;

    res
    .status(statusCode)
    .send({
        message,
        error: String(error),
        success: false
    })
};

module.exports = output;