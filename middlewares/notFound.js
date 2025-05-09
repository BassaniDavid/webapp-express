function notFound(req, res, next) {

    res.status(404)
    res.json({
        errorStatus: 404,
        errorMessage: "film non trovato"
    });

}

module.exports = notFound;