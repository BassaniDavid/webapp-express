// importo file connessione SQL
const connection = require('../data/db')

// index
function index(req, res) {

    const sql = 'SELECT * FROM `movies`;'

    connection.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json({
                errorMessage: 'database connection errror'
            })
        }

        res.json(results)
    })

    // res.send('index dei film');
}

// show
function show(req, res) {
    res.send('show dei film');
}

module.exports = {
    index,
    show
}