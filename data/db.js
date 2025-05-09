const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'movies_db'
})

connection.connect((err) => {
    if (err) throw err
    console.log('connesso a MySQL')
}
)

module.exports = connection


