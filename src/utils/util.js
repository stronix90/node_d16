const errorHandler = (message, error) => {
    return {
        status_err: true,
        message,
        error,
    };
};

module.exports = {errorHandler}
