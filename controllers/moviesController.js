// importo file connessione SQL
const connection = require('../data/db')

// index
function index(req, res) {

    const sql = 'SELECT * FROM `movies`';

    connection.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json({
                errorMessage: 'database connection errror'
            })
        }

        res.json(results);
    })

    // res.send('index dei film');
}

// show
function show(req, res) {

    // recupero id dall URL
    const { id } = req.params

    // prima query
    const sql = 'SELECT * FROM `movies` WHERE id = ?';

    connection.query(sql, [id], (err, results) => {

        if (err) {
            return res.status(500).json({
                errorMessage: 'database connection error'
            })
        }

        if (results.length === 0) {
            return res.status(404).json({
                errorMessage: 'no movie found',
                id
            })
        }

        const movie = results[0];

        // recensioni

        // seconda query
        const sql = `SELECT * FROM reviews WHERE movie_id = ?`

        // se è andata a buon fine, eseguo la seconda query rimanendo all interno della prima
        connection.query(sql, [id], (err, results) => {
            if (err) {
                console.log(err);
            }

            movie.reviews = results;

            res.json(movie);
        })


    })

    // res.send('show dei film');
}

module.exports = {
    index,
    show
}