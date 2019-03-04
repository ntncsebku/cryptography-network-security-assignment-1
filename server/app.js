import express from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';
import http from 'http';
import socketIO from 'socket.io';


import initDatabase from './libs/Database';
import apiRouter from './routes/api';

const app = express();
dotenv.config()
initDatabase().then(function () {
    console.log('Connect to MongoDB database');
}).catch(function (err) {
    console.log('Cannot connect to MongoDB data'); 
    console.log(err);
});

const PORT = process.env.PORT || 5000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.use(function (err, req, res, next) {
    res.status(err.status || 500);

    if (err.message) {
        res.send(err);
    } else {
        res.send(err.stack);
    }
});

const server = http.createServer(app);
const io = socketIO(server);

server.listen(PORT, function () {
    console.log('Listening on port', PORT); 
});