// importo file connessione SQL
const connection = require('../data/db')

// index
function index(req, res) {

    console.log(req.query);

    console.log(req.query.search);

    // destrutturo la query search passata dal frontend
    const { search } = req.query;

    let preparedParam = [];

    // divido la sql in modo da aggiungere search se presente
    let sql = 'SELECT `movies`.*, ROUND(AVG(`reviews`.`vote`), 1) AS `media_votazione` FROM `movies` LEFT JOIN `reviews` ON `movies`.`id` = `reviews`.`movie_id` ';

    if (search) {
        sql += ` WHERE title LIKE ? OR director LIKE ? OR abstract LIKE ? `
        preparedParam.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    // group by si aggiunge solo alla fine
    sql += 'GROUP BY movies.id'

    // mi connetto al db passando sql
    connection.query(sql, (err, results) => {

        // in caso di errore del db
        if (err) {
            return res.status(500).json({
                errorMessage: 'database connection errror'
            })
        }

        // alla risposta in formato json, creo un array di oggetti variando image aggiungendo il PATH. ciò non influisce sui dati nel db
        res.json(results.map(result => ({
            ...result,
            image: process.env.IMG_MOVIES_PATH + result.image
        })));
    })
}

// show
function show(req, res) {

    // recupero id dall URL
    const { id } = req.params;

    console.log(req.body);

    // prima query
    const sql = 'SELECT `movies`.*, ROUND(AVG(`reviews`.`vote`), 1) AS `media_votazione` FROM `movies` LEFT JOIN`reviews` ON `movies`.`id` = `reviews`.`movie_id`WHERE movies.id = ?';

    // mi connetto al db passando sql e id
    connection.query(sql, [id], (err, results) => {

        // in caso di errore del db
        if (err) {
            return res.status(500).json({
                errorMessage: 'database connection error'
            })
        }

        // in caso la risposta sia vuota
        if (results.length === 0) {
            return res.status(404).json({
                errorMessage: 'no movie found',
                id
            })
        }

        // salvo la risposta in una constante, variando image aggiungendo il PATH. ciò non influisce sui dati nel db
        const movie = {
            ...results[0],
            imagePath: process.env.IMG_MOVIES_PATH + results[0].image
        }

        // recensioni

        // seconda query relativa alle recensioni
        const sql = `SELECT * FROM reviews WHERE movie_id = ?`

        // se è andata a buon fine, eseguo la seconda query rimanendo all interno della prima
        connection.query(sql, [id], (err, results) => {

            // in caso di errore lo stampo in console, ma non è bloccante, semplicemente non visualizzerò le recensioni
            if (err) {
                console.log(err);
            }

            // aggiungo le recensioni per ogni film nella variabile
            movie.reviews = results;

            // restituisco la risposta in json
            res.json(movie);
        })


    })
}

// store
function storeReview(req, res) {

    const { id } = req.params;

    console.log(req.body);
    const { name, vote, text } = req.body;

    const sql = `INSERT INTO reviews (movie_id, name, vote, text)
    VALUES (?, ?, ?, ?);`

    connection.query(sql, [id, name, vote, text], (err, results) => {

        if (err) {
            return console.log(err)
            // res.status(500).json({
            //     errorMessage: err.sqlMessage
            //})
        }

        res.status(201)
        res.json({
            id,
            name,
            vote,
            text
        })
    })

}

// esporto entrambe le funzioni
module.exports = {
    index,
    show,
    storeReview
}