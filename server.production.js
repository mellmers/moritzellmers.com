var express = require('express');
var path = require('path');
var compression = require('compression');

var app = express();
app.use(compression());

var PORT = process.env.PORT || 8080;

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'dist')));

// Add headers
/*
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', 'http://localhost:' + PORT);
    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.header('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
*/

// send all requests to index.html so browserHistory in React Router works
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, 'localhost', function(err) {
    if(err) {
        console.error(err);
        return;
    }
    console.log('Production Express server running at localhost:' + PORT)
});