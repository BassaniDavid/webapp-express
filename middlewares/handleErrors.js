function errorsHandler(err, req, res, next) {
    console.log(err)
    res.status(500)
    res.json({
        errorStatus: 500,
        errorMessage: 'errore server'
    });

}

module.exports = errorsHandler;