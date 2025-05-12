// importo file connessione SQL
const connection = require('../data/db')

// index
function index(req, res) {

    console.log(req.query);

    console.log(req.query.search);

    const { search } = req.query;

    let sql = 'SELECT `movies`.*, ROUND(AVG(`reviews`.`vote`), 1) AS `media_votazione` FROM `movies` LEFT JOIN `reviews` ON `movies`.`id` = `reviews`.`movie_id` ';

    if (search) {
        sql += ` WHERE title LIKE "%${search}%" OR director LIKE "%${search}%" OR abstract LIKE "%${search}%" `
    }

    sql += 'GROUP BY movies.id'

    connection.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json({
                errorMessage: 'database connection errror'
            })
        }

        res.json(results.map(result => ({
            ...result,
            image: process.env.IMG_MOVIES_PATH + result.image
        })));
    })
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

        const movie = {
            ...results[0],
            imagePath: process.env.IMG_MOVIES_PATH + results[0].image
        }


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
}
module.exports = {
    index,
    show
}