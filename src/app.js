/****************** ADDED FOR HTTPS RUN ********************************************* */
const express = require('express')
const app = express()
const https = require('https')
const fs = require('fs')
const port = 3000

app.get('/', (req, res) => {
    // res.send("IT'S WORKING!")
    res.sendFile(__dirname + '/index.html')
})
const httpsOptions = {
    key: fs.readFileSync('./security/cert.key'),
    cert: fs.readFileSync('./security/cert.pem')
}
const server = https.createServer(httpsOptions, app)
    .listen(port, () => {
        console.log('server running at ' + port)
    })
/*************************************************************** */



// let express = require('express');
// let app = express();

// let server = require('http').Server(app);

let io = require('socket.io')(server);
let stream = require('./ws/stream');
let path = require('path');
let favicon = require('serve-favicon');

app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


io.of('/stream').on('connection', stream);

// server.listen(3000);