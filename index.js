const express = require('express'),
    cors = require('cors'),
    createError = require('http-errors'),
    PORT = process.env.PORT || 3000,
    router = require('./src/router'),
    bodyParser = require('body-parser');
    require('dotenv').config();

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', router);

//catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

//Error Handler
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.send('error');
});

app.listen(PORT);

console.log('App listening in port: ' + PORT);