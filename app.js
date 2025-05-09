const express = require('express');
const app = express();
const port = 3000;

// middleware
const notFound = require('./middlewares/notFound');
const errorsHandler = require('./middlewares/handleErrors');



// rotta principale
app.get('/', (req, res) => {
    res.send('web application')
});

// use middleware errore
app.use(notFound);
app.use(errorsHandler);


// server in ascolto
app.listen(port, () => {
    console.log('app listening at port' + port)
});