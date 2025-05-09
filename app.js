const express = require('express');
const app = express();
const port = 3000;

// middleware
const notFound = require('./middlewares/notFound');
const errorsHandler = require('./middlewares/handleErrors');

// routers
const moviesRouter = require('./routers/movies')

// middleware per asset statici
app.use(express.static('public'));

// middleware per il parsing del body
app.use(express.json());


// welcome page
app.get('/', (req, res) => {
    res.send('web application')
});

// movies
app.use('/movies', moviesRouter);

// use middleware errore 404 e 500
app.use(notFound);
app.use(errorsHandler);


// server in ascolto
app.listen(port, () => {
    console.log('app listening at port ' + port)
});