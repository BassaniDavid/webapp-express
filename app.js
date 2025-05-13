// importo express
const express = require('express');

//  inizializziamo express invocandolo come una funzione e salvando il risultato in una variabile 
const app = express();

// definiamo la prima rotta passando per .env
const port = process.env.PORT || 3000;

// importiamo cors 
// (serve per abilitare il Cross-Origin Resource Sharing (CORS), ovvero permette a un'applicazione web in esecuzione su un dominio (http://localhost:3000) di fare richieste HTTP a un server che si trova su un altro dominio.Per motivi di sicurezza, i browser bloccano le richieste HTTP cross-origin per impostazione predefinita (Same-Origin Policy). Il pacchetto cors consente di configurare il server Express per autorizzare queste richieste da domini specifici.)
const cors = require('cors');

// middleware
const notFound = require('./middlewares/notFound');
const errorsHandler = require('./middlewares/handleErrors');

// routers
const moviesRouter = require('./routers/movies')

// applico cors che agisce come middleware per poter fare la chiamata
app.use(cors({
    origin: process.env.FE_app
}))

// middleware per asset statici
app.use(express.static('public'));

// middleware per il parsing del body (per ora non in uso)
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