// importo file connessione SQL
const connection = require('../data/db')

// index
function index(req, res) {
    res.send('index dei film');
}

// show
function show(req, res) {
    res.send('show dei film');
}

module.exports = {
    index,
    show
}