function errorsHandler(err, req, res, next) {

    res.status(500)
    res.json({
        errorStatus: 500,
        errorMessage: "errore server"
    });

}

module.exports = errorsHandler;